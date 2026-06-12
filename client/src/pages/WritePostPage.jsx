import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/AuthProvider.jsx';
import { createPost } from '../services/posts.js';

const ALLOWED = ['volunteer', 'activist', 'admin'];

export default function WritePostPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, profile, role, approved, ready } = useAuth();

  const [form, setForm] = useState({ title: '', excerpt: '', image: '', body: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (!ready) {
    return <main className="auth-page"><section className="contact-form-section"><div className="container"><p>{t('loading.title')}</p></div></section></main>;
  }
  if (!user) return <Navigate to="/login" replace state={{ from: '/blog/new' }} />;
  if (!ALLOWED.includes(role)) {
    return (
      <main className="auth-page">
        <section className="page-hero"><div className="container"><h1>Not allowed</h1><p>Only volunteers and activists can write posts.</p></div></section>
        <section className="contact-form-section"><div className="container auth-form-wrap"><Link className="btn btn-ghost" to="/blog">Back to blog</Link></div></section>
      </main>
    );
  }
  if (!approved) {
    return (
      <main className="auth-page">
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Pending</span>
            <h1>Account awaiting approval</h1>
            <p>Your {role} account needs to be approved by an admin before you can publish posts. You’ll be able to write once approved.</p>
          </div>
        </section>
        <section className="contact-form-section"><div className="container auth-form-wrap"><Link className="btn btn-ghost" to="/blog">Back to blog</Link></div></section>
      </main>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) { setError('Title and content are required.'); return; }
    setBusy(true);
    setError('');
    try {
      const content = form.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
      const words = form.body.trim().split(/\s+/).length;
      await createPost({
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || content[0]?.slice(0, 160) || '',
        image: form.image.trim(),
        content,
        author: profile?.name || user.displayName || user.email,
        authorId: user.uid,
        authorRole: role,
        date: new Date().toISOString().slice(0, 10),
        readMins: Math.max(1, Math.round(words / 200))
      });
      navigate('/blog');
    } catch (err) {
      setError(`Could not publish: ${err.code || err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Write</span>
          <h1>Write a blog post</h1>
          <p>Share a rescue story, a field update, or your perspective.</p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container auth-form-wrap">
          <form className="contact-form" onSubmit={submit} noValidate>
            <label>
              <span>Title {t('common.required')}</span>
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
              <span>Content {t('common.required')}</span>
              <textarea rows={10} value={form.body} onChange={update('body')} placeholder="Write your post… Leave a blank line between paragraphs." required />
            </label>

            <button className="btn btn-primary btn-xl" type="submit" disabled={busy}>
              <i className="fas fa-paper-plane" /> {busy ? 'Publishing…' : 'Publish post'}
            </button>
            {error && <p className="form-msg form-msg-err"><i className="fas fa-triangle-exclamation" /> {error}</p>}
            <Link className="btn btn-link" to="/blog"><i className="fas fa-arrow-left" /> Cancel</Link>
          </form>
        </div>
      </section>
    </main>
  );
}
