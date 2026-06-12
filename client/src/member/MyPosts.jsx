import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';
import { usePosts } from '../hooks/usePosts.js';
import { deletePost } from '../services/posts.js';

export default function MyPosts() {
  const { user } = useAuth();
  const { posts, ready } = usePosts();
  const mine = posts.filter((p) => p.authorId === user.uid);

  const remove = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await deletePost(id);
    } catch (err) {
      alert(`Delete failed: ${err.code || err.message}`);
    }
  };

  return (
    <div className="dash-section">
      <div className="dash-section-head">
        <h2>My Blog Posts</h2>
        <Link className="btn btn-primary dash-add" to="/member/write"><i className="fas fa-pen-nib" /> Write Post</Link>
      </div>

      <div className="ov-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ov-table">
          <thead><tr><th>Title</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {!ready && <tr><td colSpan={3} className="ov-empty">Loading…</td></tr>}
            {ready && mine.length === 0 && (
              <tr><td colSpan={3} className="ov-empty">You haven’t written any posts yet.</td></tr>
            )}
            {mine.map((p) => (
              <tr key={p.id}>
                <td className="ov-td-title">
                  <a href={`/blog/${p.id}`} target="_blank" rel="noreferrer" className="ov-title-link">{p.title}</a>
                </td>
                <td>{p.date || '—'}</td>
                <td>
                  <div className="dash-row-actions">
                    <a className="dash-icon-btn" href={`/blog/${p.id}`} target="_blank" rel="noreferrer" aria-label="View"><i className="fas fa-arrow-up-right-from-square" /></a>
                    <Link className="dash-icon-btn" to={`/member/write/${p.id}`} aria-label="Edit"><i className="fas fa-pen" /></Link>
                    <button className="dash-icon-btn" onClick={() => remove(p.id, p.title)} aria-label="Delete"><i className="fas fa-trash" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
