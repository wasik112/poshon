import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header({ brand, nav, topContact, onToggleAdmin, adminMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderNavLink = (item) => {
    if (item.label === 'Locations') {
      return (
        <NavLink
          key={item.label}
          to="/booths"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? 'is-active' : '')}
        >
          {item.label}
        </NavLink>
      );
    }
    if (item.label === 'Home') {
      return (
        <Link key={item.label} to="/" onClick={() => setMenuOpen(false)}>
          {item.label}
        </Link>
      );
    }
    return (
      <a key={item.href} href={`/${item.href}`} onClick={() => setMenuOpen(false)}>
        {item.label}
      </a>
    );
  };

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link className="brand" to="/">
          <span className="brand-mark"><i className="fas fa-paw" /></span>
          <span className="brand-text">
            <strong>{brand.name}</strong>
            <small>{brand.tagline}</small>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <i className={`fas ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} />
        </button>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          {nav.map(renderNavLink)}
          <button className="admin-toggle" onClick={onToggleAdmin}>
            {adminMode ? 'Close Admin' : 'Edit Content'}
          </button>
        </nav>

        <div className="top-contact">
          <small>{topContact.label}</small>
          <strong>
            <i className="fas fa-phone" /> {topContact.phone}
          </strong>
        </div>
      </div>
    </header>
  );
}
