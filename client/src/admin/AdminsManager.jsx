import { useEffect, useState } from 'react';
import { createAdminAccount } from '../services/auth.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { subscribeUsers, deleteUserProfile } from '../services/users.js';

export default function AdminsManager() {
  const { isAdmin, user } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const [users, setUsers] = useState([]);
  const [ready, setReady] = useState(false);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let unsub = () => {};
    try {
      unsub = subscribeUsers((list) => { setUsers(list); setReady(true); }, () => setReady(true));
    } catch {
      setReady(true);
    }
    return () => unsub();
  }, []);

  const admins = users.filter((u) => u.role === 'admin');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      await createAdminAccount({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      });
      setMessage(`Admin "${form.email.trim()}" created.`);
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setMessage(`Failed: ${err.code || err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const removeAdmin = async (uid, name) => {
    if (!window.confirm(`Remove admin access for ${name || 'this user'}?`)) return;
    setBusyId(uid);
    try {
      await deleteUserProfile(uid);
    } catch (err) {
      alert(`Failed: ${err.code || err.message}`);
    } finally {
      setBusyId(null);
    }
  };

  if (!isAdmin) {
    return (
      <div className="dash-section">
        <div className="dash-section-head"><h2>Administrators</h2></div>
        <p className="dash-hint"><i className="fas fa-lock" /> Only administrators can create admin accounts.</p>
      </div>
    );
  }

  return (
    <div className="dash-section">
      <div className="dash-section-head"><h2>Administrators</h2></div>

      <p className="dash-hint" style={{ marginTop: 0 }}>
        <i className="fas fa-shield-halved" /> Only admins can create another admin. Volunteers and
        activists can never gain admin access.
      </p>

      <fieldset className="dash-fieldset dash-create-admin">
        <legend>Create a new admin</legend>
        <p className="dash-hint">Use a <strong>new email</strong> that isn’t already registered. New admins can edit all content and create further admins. You stay signed in.</p>
        <form onSubmit={submit}>
          <label className="dash-field">
            <span>Name</span>
            <input type="text" value={form.name} onChange={update('name')} required />
          </label>
          <label className="dash-field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={update('email')} placeholder="newadmin@example.com" required />
          </label>
          <label className="dash-field">
            <span>Password (min 6 chars)</span>
            <input type="password" value={form.password} onChange={update('password')} minLength={6} required />
          </label>
          <div className="dash-actions">
            <button className="btn btn-primary" type="submit" disabled={busy}>
              {busy ? 'Creating…' : 'Create Admin'}
            </button>
            <span className="dash-message">{message}</span>
          </div>
        </form>
      </fieldset>

      {/* Existing admins */}
      <div className="ov-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="dash-table-head"><i className="fas fa-user-shield" /> Current admins ({admins.length})</div>
        <table className="ov-table">
          <thead><tr><th>Name</th><th>Email</th><th>Action</th></tr></thead>
          <tbody>
            {!ready && <tr><td colSpan={3} className="ov-empty">Loading…</td></tr>}
            {ready && admins.length === 0 && <tr><td colSpan={3} className="ov-empty">No admins found.</td></tr>}
            {admins.map((a) => (
              <tr key={a.uid}>
                <td className="ov-td-title">{a.name || '—'}</td>
                <td>{a.email || '—'}</td>
                <td>
                  {a.uid === user.uid
                    ? <span className="role-badge role-admin">You</span>
                    : <button className="banner-vis" disabled={busyId === a.uid} onClick={() => removeAdmin(a.uid, a.name)}>
                        <i className="fas fa-user-minus" /> Remove
                      </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
