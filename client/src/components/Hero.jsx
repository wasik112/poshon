export default function Hero({ hero, onPrimary }) {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>
            <span className="hero-title-accent">{hero.titleA}</span>
            <br />
            {hero.titleB}
          </h1>
          <p className="lead">{hero.subtitle}</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-xl" onClick={onPrimary}>
              <i className="fas fa-location-dot" />
              {hero.primaryCta.label}
              <i className="fas fa-arrow-right" />
            </button>
            <a className="btn btn-ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-art-frame" style={{ backgroundImage: `url(${hero.image})` }} />
          <div className="hero-art-badge">
            <i className="fas fa-paw" />
            <span>Trusted by 500+ families</span>
          </div>
        </div>
      </div>
    </section>
  );
}
