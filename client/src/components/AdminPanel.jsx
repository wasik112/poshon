import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function AdminPanel({ site, locations, onSaved, onClose }) {
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDraft(JSON.stringify({ site, locations }, null, 2));
  }, [site, locations]);

  const save = async () => {
    setBusy(true);
    setMessage('');
    try {
      const parsed = JSON.parse(draft);
      if (!parsed.site || !Array.isArray(parsed.locations)) {
        throw new Error('JSON must include "site" object and "locations" array.');
      }
      const [newSite, newLocations] = await Promise.all([
        api.updateSite(parsed.site),
        api.updateLocations(parsed.locations)
      ]);
      onSaved(newSite, newLocations);
      setMessage('Saved successfully.');
    } catch (err) {
      setMessage(`Save failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <aside className="admin-panel">
      <header className="admin-head">
        <div>
          <small>Admin</small>
          <h3>Site Content Editor</h3>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Close admin">
          <i className="fas fa-xmark" />
        </button>
      </header>
      <p className="admin-help">
        Edit the JSON below. Changes are saved to the backend immediately.
      </p>
      <textarea
        className="admin-editor"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        spellCheck={false}
        aria-label="Site JSON editor"
      />
      <div className="admin-actions">
        <button className="btn btn-primary" onClick={save} disabled={busy}>
          {busy ? 'Saving…' : 'Save Changes'}
        </button>
        <span className="admin-message">{message}</span>
      </div>
    </aside>
  );
}
