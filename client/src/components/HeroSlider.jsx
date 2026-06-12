import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Rotating hero/banner slider. Renders 1..n banners; with more than one it
// auto-advances and shows arrows + dots. Each slide reuses the hero styles.
export default function HeroSlider({ banners, onPrimary }) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const count = banners.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);

  // Auto-advance every 6s when there's more than one slide.
  useEffect(() => {
    if (count <= 1) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  // Keep index valid if banners shrink.
  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  if (!count) return null;

  return (
    <section id="home" className="hero hero-slider">
      <div className="hero-slides" style={{ transform: `translateX(-${index * 100}%)` }}>
        {banners.map((hero) => (
          <div className="hero-slide" key={hero.id ?? hero.titleA}>
            <div className="container hero-grid">
              <div className="hero-copy">
                {hero.eyebrow && <span className="eyebrow">{hero.eyebrow}</span>}
                <h1>
                  <span className="hero-title-accent">{hero.titleA}</span>
                  <br />
                  {hero.titleB}
                </h1>
                <p className="lead">{hero.subtitle}</p>
                <div className="hero-actions">
                  <button className="btn btn-primary btn-xl" onClick={onPrimary}>
                    <i className="fas fa-location-dot" />
                    {hero.primaryCta?.label}
                    <i className="fas fa-arrow-right" />
                  </button>
                  {hero.secondaryCta?.label && (
                    <a className="btn btn-ghost" href={hero.secondaryCta.href}>
                      {hero.secondaryCta.label}
                    </a>
                  )}
                </div>
              </div>

              <div className="hero-art">
                <div className="hero-art-frame" style={{ backgroundImage: `url(${hero.image})` }} />
                <div className="hero-art-badge">
                  <i className="fas fa-paw" />
                  <span>{t('hero.badge')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button className="hero-arrow hero-arrow-prev" onClick={() => go(index - 1)} aria-label="Previous banner">
            <i className="fas fa-chevron-left" />
          </button>
          <button className="hero-arrow hero-arrow-next" onClick={() => go(index + 1)} aria-label="Next banner">
            <i className="fas fa-chevron-right" />
          </button>
          <div className="hero-dots">
            {banners.map((b, i) => (
              <button
                key={b.id ?? i}
                className={`hero-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Go to banner ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
