import { useState } from 'react';
import { NavLink, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';
import { logout } from '../services/auth.js';
import MemberOverview from './MemberOverview.jsx';
import MyPosts from './MyPosts.jsx';
import PostForm from './PostForm.jsx';

const NAV = [
  { to: '/member', end: true, icon: 'fa-gauge-high', label: 'Overview' },
  { to: '/member/posts', icon: 'fa-newspaper', label: 'My Blog Posts' },
  { to: '/member/write', icon: 'fa-pen-nib', label: 'Write Post' }
];

function Shell({ user, profile, role }) {
  const [navOpen, setNavOpen] = useState(false);
  const close = () => setNavOpen(false);

  return (
    <div className="dash-shell">
      <aside className={`dash-sidebar ${navOpen ? 'is-open' : ''}`}>
        <Link to="/" className="dash-brand" onClick={close}>
          <span className="dash-brand-mark"><i className="fas fa-paw" /></span>
          <span>POSHON<small>{role}</small></span>
        </Link>
        <nav className="dash-nav">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => (isActive ? 'is-active' : '')} onClick={close}>
              <i className={`fas ${item.icon}`} /> <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="dash-sidebar-foot">
          <div className="dash-promo">
            <strong>View the site</strong>
            <p>See your posts live on the blog.</p>
            <Link to="/blog" className="dash-promo-btn">Open blog</Link>
          </div>
          <button className="dash-foot-link" onClick={() => logout()}>
            <i className="fas fa-right-from-bracket" /> Log out
          </button>
        </div>
      </aside>

      {navOpen && <div className="dash-overlay" onClick={close} />}

      <div className="dash-main">
        <header className="dash-topbar">
          <button className="dash-burger" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            <i className="fas fa-bars" />
          </button>
          <h1 className="dash-title">My Dashboard</h1>
          <div className="dash-topbar-right">
            <span className="dash-user" title={profile?.name || user.email}><i className="fas fa-circle-user" /></span>
          </div>
        </header>
        <div className="dash-content">
          <Routes>
            <Route index element={<MemberOverview />} />
            <Route path="posts" element={<MyPosts />} />
            <Route path="write" element={<PostForm />} />
            <Route path="write/:id" element={<PostForm />} />
            <Route path="*" element={<Navigate to="/member" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function MemberDashboard() {
  const { user, profile, role, approved, isAdmin, ready } = useAuth();

  if (!ready) {
    return <div className="dash-gate"><i className="fas fa-spinner fa-spin" /> Checking access…</div>;
  }
  if (!user) return <Navigate to="/login" replace state={{ from: '/member' }} />;
  if (isAdmin) return <Navigate to="/admin" replace />;

  if (role !== 'volunteer' && role !== 'activist') {
    return (
      <div className="dash-gate">
        <div>
          <h2>Members only</h2>
          <p>This area is for volunteers and activists.</p>
          <Link className="btn btn-primary" to="/">Back to site</Link>
        </div>
      </div>
    );
  }

  if (!approved) {
    return (
      <div className="dash-gate">
        <div>
          <h2>Awaiting approval</h2>
          <p>Your {role} account is pending admin approval. Once approved, you can write and manage blog posts here.</p>
          <Link className="btn btn-ghost" to="/account">My account</Link>
          <Link className="btn btn-primary" to="/">Back to site</Link>
        </div>
      </div>
    );
  }

  return <Shell user={user} profile={profile} role={role} />;
}
