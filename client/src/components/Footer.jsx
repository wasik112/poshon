export default function Footer({ brand, footer, contact }) {
  return (
    <footer id="contact" className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-mark light"><i className="fas fa-paw" /></span>
          <h3>{brand.name}</h3>
          <p>{footer.blurb}</p>
          <div className="footer-social">
            {footer.social.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                <i className={`fab ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Visit</h4>
          <p><i className="fas fa-location-dot" /> {contact.address}</p>
          <p><i className="fas fa-clock" /> {contact.hours}</p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p><i className="fas fa-phone" /> {contact.phone}</p>
          <p><i className="fas fa-envelope" /> {contact.email}</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-nav">
            {footer.nav.map((n) => (
              <li key={n.href}><a href={n.href}>{n.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-bar">
        <small>{footer.copyright}</small>
      </div>
    </footer>
  );
}
