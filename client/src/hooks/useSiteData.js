import { useCallback, useEffect, useState } from 'react';
import { fetchContent, subscribeContent } from '../services/content.js';

export function useSiteData() {
  const [site, setSite] = useState(null);
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const { site: siteData, locations: locationData } = await fetchContent();
      setSite(siteData);
      setLocations(locationData);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();

    // Live updates: whenever an admin saves, the public site refreshes
    // automatically — no manual reload needed.
    let unsubscribe = () => {};
    try {
      unsubscribe = subscribeContent(({ site: s, locations: l }) => {
        setSite(s);
        setLocations(l);
        setStatus('ready');
      });
    } catch {
      /* Firestore unavailable — initial fetchContent fallback still applies. */
    }
    return () => unsubscribe();
  }, [load]);

  return { site, locations, status, error, reload: load, setSite, setLocations };
}
