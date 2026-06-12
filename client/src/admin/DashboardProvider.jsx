import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { fetchContent, saveContent } from '../services/content.js';

const DashboardContext = createContext(null);

// Loads the content tree, then AUTO-SAVES every change to Firestore
// (debounced). Each add/edit/delete is persisted to the database on its
// own — no manual Save step. status reflects: idle | saving | saved | error.
export function DashboardProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);
  const latestRef = useRef(null);

  useEffect(() => {
    let alive = true;
    fetchContent()
      .then((c) => { if (alive) { setContent(c); latestRef.current = c; setLoading(false); } })
      .catch(() => { if (alive) setLoading(false); });
    return () => { alive = false; clearTimeout(timerRef.current); };
  }, []);

  const doSave = async (data) => {
    setStatus('saving');
    try {
      await saveContent(data);
      setStatus('saved');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setMessage(err.code || err.message);
    }
  };

  // Debounce rapid edits (e.g. typing) into one write.
  const queueSave = (data) => {
    latestRef.current = data;
    setStatus('saving');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSave(data), 800);
  };

  const apply = (next) => {
    setContent(next);
    queueSave(next);
  };

  const updateSite = (key, value) =>
    apply({ ...content, site: { ...content.site, [key]: value } });

  const updateLocations = (value) =>
    apply({ ...content, locations: value });

  // Force an immediate save (used by the Retry button).
  const saveNow = () => {
    clearTimeout(timerRef.current);
    if (latestRef.current) doSave(latestRef.current);
  };

  const value = { content, loading, status, message, updateSite, updateLocations, saveNow };
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  return useContext(DashboardContext);
}
