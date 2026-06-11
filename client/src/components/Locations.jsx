import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Locations({ locations }) {
  const { t } = useTranslation();
  return (
    <section id="locations" className="locations-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t('locations.eyebrow')}</span>
          <h2>{t('locations.title')}</h2>
        </div>
        <div className="locations-grid">
          {locations.map((location) => (
            <article key={location.id} className="location-card">
              <span className="location-icon">
                <i className="fas fa-location-dot" />
              </span>
              <div>
                <h3>{location.name}</h3>
                <p>{location.description}</p>
                <Link className="btn btn-link" to="/booths">
                  {t('locations.viewOnMap')} <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="locations-cta">
          <Link className="btn btn-primary btn-xl" to="/booths">
            <i className="fas fa-map-location-dot" />
            {t('locations.seeAll')}
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
