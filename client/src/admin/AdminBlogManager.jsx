import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts.js';
import { deletePost, updatePost } from '../services/posts.js';

// Admin moderation for user-written blog posts (the `posts` collection).
// Posts go live immediately; the admin can hide (deactivate) or delete them.
export default function AdminBlogManager() {
  const { posts, ready } = usePosts();

  const remove = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deletePost(id);
    } catch (err) {
      alert(`Delete failed: ${err.code || err.message}`);
    }
  };

  const toggleHidden = async (p) => {
    try {
      await updatePost(p.id, { hidden: !p.hidden });
    } catch (err) {
      alert(`Failed: ${err.code || err.message}`);
    }
  };

  return (
    <div className="dash-section">
      <div className="dash-section-head">
        <h2>Blog Posts</h2>
        <Link className="btn btn-primary dash-add" to="/blog/new"><i className="fas fa-pen-nib" /> Write post</Link>
      </div>

      <p className="dash-hint" style={{ marginTop: 0 }}>
        <i className="fas fa-circle-info" /> Posts written by volunteers & activists appear here and
        go live immediately. Delete anything inappropriate.
      </p>

      <div className="ov-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ov-table">
          <thead>
            <tr><th>Title</th><th>Author</th><th>Role</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {!ready && <tr><td colSpan={5} className="ov-empty">Loading…</td></tr>}
            {ready && posts.length === 0 && (
              <tr><td colSpan={5} className="ov-empty">No posts yet. Volunteer & activist posts will show here.</td></tr>
            )}
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="ov-td-title">
                  <a href={`/blog/${p.id}`} target="_blank" rel="noreferrer" className="ov-title-link">{p.title}</a>
                </td>
                <td>{p.author || '—'}</td>
                <td>{p.authorRole ? <span className={`role-badge role-${p.authorRole}`}>{p.authorRole}</span> : '—'}</td>
                <td>
                  {p.hidden
                    ? <button className="banner-vis" onClick={() => toggleHidden(p)}><i className="fas fa-eye-slash" /> Hidden</button>
                    : <button className="banner-vis is-on" onClick={() => toggleHidden(p)}><i className="fas fa-eye" /> Live</button>}
                </td>
                <td>
                  <div className="dash-row-actions">
                    <a className="dash-icon-btn" href={`/blog/${p.id}`} target="_blank" rel="noreferrer" aria-label="View"><i className="fas fa-arrow-up-right-from-square" /></a>
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
