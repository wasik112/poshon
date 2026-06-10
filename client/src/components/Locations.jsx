import { Link } from 'react-router-dom';

export default function Locations({ locations }) {
  return (
    <section id="locations" className="locations-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Where we help</span>
          <h2>Street Dog Booth Locations</h2>
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
                  View on Map <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="locations-cta">
          <Link className="btn btn-primary btn-xl" to="/booths">
            <i className="fas fa-map-location-dot" />
            See All Booths on Live Map
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
