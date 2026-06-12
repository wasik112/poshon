import { useEffect, useState } from 'react';
import { subscribeUsers, setUserApproval, deleteUserProfile } from '../services/users.js';

// Admins approve/revoke volunteer & activist accounts here. Only approved
// members can publish blog posts.
export default function AdminMembers() {
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

  const members = users.filter((u) => u.role === 'volunteer' || u.role === 'activist');
  const pending = members.filter((m) => !m.approved);
  const approved = members.filter((m) => m.approved);

  const set = async (uid, value) => {
    setBusyId(uid);
    try {
      await setUserApproval(uid, value);
    } catch (err) {
      alert(`Failed: ${err.code || err.message}`);
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (uid, name) => {
    if (!window.confirm(`Remove ${name || 'this member'}? They will lose volunteer/activist access.`)) return;
    setBusyId(uid);
    try {
      await deleteUserProfile(uid);
    } catch (err) {
      alert(`Failed: ${err.code || err.message}`);
    } finally {
      setBusyId(null);
    }
  };

  const Row = ({ m, action }) => (
    <tr key={m.uid}>
      <td className="ov-td-title">{m.name || '—'}</td>
      <td>{m.email || '—'}</td>
      <td><span className={`role-badge role-${m.role}`}>{m.role}</span></td>
      <td>
        <div className="dash-row-actions">
          {action}
          <button className="banner-vis" disabled={busyId === m.uid} onClick={() => remove(m.uid, m.name)}>
            <i className="fas fa-trash" /> Remove
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="dash-section">
      <div className="dash-section-head"><h2>Members &amp; Approvals</h2></div>

      <p className="dash-hint" style={{ marginTop: 0 }}>
        <i className="fas fa-circle-info" /> Approve a volunteer or activist once — after that they
        can publish blog posts freely.
      </p>

      <div className="ov-card" style={{ padding: 0, overflow: 'hidden', marginBottom: 22 }}>
        <div className="dash-table-head"><i className="fas fa-clock" /> Pending approval ({pending.length})</div>
        <table className="ov-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>
            {!ready && <tr><td colSpan={4} className="ov-empty">Loading…</td></tr>}
            {ready && pending.length === 0 && <tr><td colSpan={4} className="ov-empty">No one waiting. 🎉</td></tr>}
            {pending.map((m) => (
              <Row key={m.uid} m={m} action={
                <button className="btn btn-primary dash-add" disabled={busyId === m.uid} onClick={() => set(m.uid, true)}>
                  <i className="fas fa-check" /> Approve
                </button>
              } />
            ))}
          </tbody>
        </table>
      </div>

      <div className="ov-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="dash-table-head"><i className="fas fa-circle-check" /> Approved members ({approved.length})</div>
        <table className="ov-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>
            {ready && approved.length === 0 && <tr><td colSpan={4} className="ov-empty">No approved members yet.</td></tr>}
            {approved.map((m) => (
              <Row key={m.uid} m={m} action={
                <button className="banner-vis" disabled={busyId === m.uid} onClick={() => set(m.uid, false)}>
                  <i className="fas fa-ban" /> Revoke
                </button>
              } />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
