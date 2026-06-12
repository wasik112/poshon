import { useState } from 'react';
import { NavLink, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';
import { logout } from '../services/auth.js';
import { DashboardProvider, useDashboard } from './DashboardProvider.jsx';
import DashboardOverview from './DashboardOverview.jsx';
import BannerEditor from './BannerEditor.jsx';
import SiteContentEditor from './SiteContentEditor.jsx';
import StreetDogsEditor from './StreetDogsEditor.jsx';
import AdminsManager from './AdminsManager.jsx';
import AdminBlogManager from './AdminBlogManager.jsx';
import AdminMembers from './AdminMembers.jsx';
import {
  BoothsEditor,
  VolunteersEditor,
  ActivistsEditor,
  TeamEditor
} from './collections.jsx';

// Overview stays at the top; everything else is grouped under a main name
// to keep the sidebar compact. Groups collapse/expand.
const OVERVIEW = { to: '/admin', end: true, icon: 'fa-gauge-high', label: 'Overview' };

const NAV_GROUPS = [
  {
    label: 'Website',
    icon: 'fa-globe',
    items: [
      { to: '/admin/banner', icon: 'fa-image', label: 'Banner' },
      { to: '/admin/content', icon: 'fa-pen-to-square', label: 'Site Content' },
      { to: '/admin/street-dogs', icon: 'fa-dog', label: 'Street Dogs' }
    ]
  },
  {
    label: 'Community',
    icon: 'fa-users',
    items: [
      { to: '/admin/members', icon: 'fa-user-check', label: 'Members & Approvals' },
      { to: '/admin/volunteers', icon: 'fa-hand-holding-heart', label: 'Volunteers' },
      { to: '/admin/activists', icon: 'fa-bullhorn', label: 'Activists' },
      { to: '/admin/team', icon: 'fa-user-group', label: 'Team' }
    ]
  },
  {
    label: 'Content & Places',
    icon: 'fa-newspaper',
    items: [
      { to: '/admin/blog', icon: 'fa-newspaper', label: 'Blog' },
      { to: '/admin/booths', icon: 'fa-location-dot', label: 'Booths' }
    ]
  },
  {
    label: 'Settings',
    icon: 'fa-gear',
    items: [
      { to: '/admin/admins', icon: 'fa-user-shield', label: 'Admins' }
    ]
  }
];

function NavGroup({ group, pathname, onNavigate }) {
  const hasActive = group.items.some((it) => pathname === it.to || pathname.startsWith(`${it.to}/`));
  const [open, setOpen] = useState(hasActive);
  return (
    <div className={`dash-navgroup ${open ? 'is-open' : ''}`}>
      <button className="dash-navgroup-head" onClick={() => setOpen((o) => !o)}>
        <i className={`fas ${group.icon}`} />
        <span>{group.label}</span>
        <i className={`fas fa-chevron-down dash-navgroup-chev`} />
      </button>
      {open && (
        <div className="dash-navgroup-items">
          {group.items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              onClick={onNavigate}
            >
              <i className={`fas ${it.icon}`} /> <span>{it.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function TopBar({ user, profile, onMenu }) {
  const { status, message, saveNow } = useDashboard();
  return (
    <header className="dash-topbar">
      <button className="dash-burger" onClick={onMenu} aria-label="Toggle menu">
        <i className="fas fa-bars" />
      </button>
      <h1 className="dash-title">Dashboard</h1>
      <label className="dash-search">
        <i className="fas fa-magnifying-glass" />
        <input type="search" placeholder="Search Here" aria-label="Search" />
      </label>
      <div className="dash-topbar-right">
        {status === 'saving' && (
          <span className="dash-status dash-status-saving"><i className="fas fa-spinner fa-spin" /> Saving…</span>
        )}
        {status === 'saved' && (
          <span className="dash-status dash-status-ok"><i className="fas fa-circle-check" /> Saved</span>
        )}
        {status === 'error' && (
          <span className="dash-status dash-status-err">
            <i className="fas fa-triangle-exclamation" /> {message || 'Save failed'}
            <button className="dash-retry" onClick={saveNow}>Retry</button>
          </span>
        )}
        <span className="dash-icon-pill"><i className="fas fa-bell" /></span>
        <span className="dash-user" title={profile?.name || user.email}>
          <i className="fas fa-circle-user" />
        </span>
      </div>
    </header>
  );
}

function DashboardBody() {
  const { loading, content } = useDashboard();
  const { user, profile } = useAuth();
  const { pathname } = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  return (
    <div className="dash-shell">
      <aside className={`dash-sidebar ${navOpen ? 'is-open' : ''}`}>
        <Link to="/" className="dash-brand" onClick={() => setNavOpen(false)}>
          <span className="dash-brand-mark"><i className="fas fa-paw" /></span>
          <span>POSHON<small>Admin</small></span>
        </Link>
        <nav className="dash-nav">
          <NavLink
            to={OVERVIEW.to}
            end={OVERVIEW.end}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
            onClick={closeNav}
          >
            <i className={`fas ${OVERVIEW.icon}`} /> <span>{OVERVIEW.label}</span>
          </NavLink>
          {NAV_GROUPS.map((group) => (
            <NavGroup key={group.label} group={group} pathname={pathname} onNavigate={closeNav} />
          ))}
        </nav>
        <div className="dash-sidebar-foot">
          <div className="dash-promo">
            <strong>View your live site</strong>
            <p>See your changes on the public website.</p>
            <Link to="/" className="dash-promo-btn">Open site</Link>
          </div>
          <button className="dash-foot-link" onClick={() => logout()}>
            <i className="fas fa-right-from-bracket" /> Log out
          </button>
        </div>
      </aside>

      {navOpen && <div className="dash-overlay" onClick={() => setNavOpen(false)} />}

      <div className="dash-main">
        <TopBar user={user} profile={profile} onMenu={() => setNavOpen((v) => !v)} />
        <div className="dash-content">
          {loading || !content ? (
            <div className="dash-loading"><i className="fas fa-spinner fa-spin" /> Loading content…</div>
          ) : (
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="banner" element={<BannerEditor />} />
              <Route path="content" element={<SiteContentEditor />} />
              <Route path="street-dogs" element={<StreetDogsEditor />} />
              <Route path="booths" element={<BoothsEditor />} />
              <Route path="volunteers" element={<VolunteersEditor />} />
              <Route path="activists" element={<ActivistsEditor />} />
              <Route path="members" element={<AdminMembers />} />
              <Route path="blog" element={<AdminBlogManager />} />
              <Route path="team" element={<TeamEditor />} />
              <Route path="admins" element={<AdminsManager />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isAdmin, ready } = useAuth();

  if (!ready) {
    return <div className="dash-gate"><i className="fas fa-spinner fa-spin" /> Checking access…</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: '/admin' }} />;
  }
  if (!isAdmin) {
    return (
      <div className="dash-gate">
        <div>
          <h2>No admin access</h2>
          <p>This account isn’t an administrator. Ask an existing admin to grant access.</p>
          <button className="btn btn-ghost" onClick={() => logout()}>Log out</button>
          <Link className="btn btn-primary" to="/">Back to site</Link>
        </div>
      </div>
    );
  }

  return (
    <DashboardProvider>
      <DashboardBody />
    </DashboardProvider>
  );
}
