import { useState } from 'react';
import { createAdminAccount } from '../services/auth.js';

export default function AdminsManager() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

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

  return (
    <div className="dash-section">
      <div className="dash-section-head"><h2>Administrators</h2></div>

      <fieldset className="dash-fieldset dash-create-admin">
        <legend>Create a new admin</legend>
        <p className="dash-hint">New admins can edit all content and create further admins. You stay signed in.</p>
        <form onSubmit={submit}>
          <label className="dash-field">
            <span>Name</span>
            <input type="text" value={form.name} onChange={update('name')} required />
          </label>
          <label className="dash-field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={update('email')} required />
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
    </div>
  );
}
