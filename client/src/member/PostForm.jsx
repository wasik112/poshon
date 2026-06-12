import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';
import { usePosts } from '../hooks/usePosts.js';
import { createPost, updatePost } from '../services/posts.js';

const blank = { title: '', excerpt: '', image: '', body: '' };

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile, role } = useAuth();
  const { posts, ready } = usePosts();

  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  // When editing, prefill from the existing post once it arrives.
  useEffect(() => {
    if (!id || loaded || !ready) return;
    const post = posts.find((p) => p.id === id);
    if (post) {
      setForm({
        title: post.title || '',
        excerpt: post.excerpt || '',
        image: post.image || '',
        body: Array.isArray(post.content) ? post.content.join('\n\n') : post.content || ''
      });
      setLoaded(true);
    }
  }, [id, posts, ready, loaded]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) { setError('Title and content are required.'); return; }
    setBusy(true);
    setError('');
    try {
      const content = form.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
      const words = form.body.trim().split(/\s+/).length;
      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || content[0]?.slice(0, 160) || '',
        image: form.image.trim(),
        content,
        readMins: Math.max(1, Math.round(words / 200))
      };
      if (id) {
        await updatePost(id, payload);
      } else {
        await createPost({
          ...payload,
          author: profile?.name || user.displayName || user.email,
          authorId: user.uid,
          authorRole: role,
          date: new Date().toISOString().slice(0, 10)
        });
      }
      navigate('/member/posts');
    } catch (err) {
      setError(`Could not save: ${err.code || err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="dash-section">
      <div className="dash-section-head"><h2>{id ? 'Edit Post' : 'Write a Post'}</h2></div>

      <form className="contact-form" onSubmit={submit} noValidate style={{ maxWidth: 680 }}>
        <label>
          <span>Title *</span>
          <input type="text" value={form.title} onChange={update('title')} required />
        </label>
        <label>
          <span>Short summary (optional)</span>
          <input type="text" value={form.excerpt} onChange={update('excerpt')} placeholder="One-line teaser shown in the list" />
        </label>
        <label>
          <span>Cover image URL (optional)</span>
          <input type="url" value={form.image} onChange={update('image')} placeholder="https://…" />
        </label>
        <label>
          <span>Content *</span>
          <textarea rows={10} value={form.body} onChange={update('body')} placeholder="Write your post… Leave a blank line between paragraphs." required />
        </label>

        <button className="btn btn-primary btn-xl" type="submit" disabled={busy}>
          <i className="fas fa-paper-plane" /> {busy ? 'Saving…' : id ? 'Update post' : 'Publish post'}
        </button>
        {error && <p className="form-msg form-msg-err"><i className="fas fa-triangle-exclamation" /> {error}</p>}
      </form>
    </div>
  );
}
