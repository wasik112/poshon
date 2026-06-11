import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const ROUTE_BY_LABEL = {
  Home: '/',
  About: '/about',
  Project: '/project',
  Team: '/team',
  Blog: '/blog',
  Locations: '/booths',
  Contact: '/contact'
};

function DropdownItem({ item, t, onItemClick }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`nav-dropdown ${open ? 'is-open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="nav-dropdown-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {t(`nav.${item.label}`, item.label)} <i className="fas fa-chevron-down nav-chevron" />
      </button>
      <div className="nav-dropdown-panel" role="menu">
        {item.children.map((child) => (
          <NavLink
            key={child.label}
            to={child.route}
            onClick={() => { setOpen(false); onItemClick(); }}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            {t(`nav.${child.label}`, child.label)}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Header({ brand, nav, onToggleAdmin, adminMode }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const renderNavItem = (item) => {
    if (item.children && item.children.length) {
      return <DropdownItem key={item.label} item={item} t={t} onItemClick={closeMenu} />;
    }
    const route = ROUTE_BY_LABEL[item.label];
    const label = t(`nav.${item.label}`, item.label);
    if (route) {
      return (
        <NavLink
          key={item.label}
          to={route}
          end={route === '/'}
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? 'is-active' : '')}
        >
          {label}
        </NavLink>
      );
    }
    return (
      <a key={item.label} href={item.href || '#'} onClick={closeMenu}>
        {label}
      </a>
    );
  };

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark"><i className="fas fa-paw" /></span>
          <span className="brand-text">
            <strong>{brand.name}</strong>
            <small>{brand.tagline}</small>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label={t('nav.toggleMenu')}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <i className={`fas ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} />
        </button>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          {nav.map(renderNavItem)}
          <button className="admin-toggle" onClick={onToggleAdmin}>
            {adminMode ? t('nav.closeAdmin') : t('nav.editContent')}
          </button>
        </nav>

        <div className="header-right">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
