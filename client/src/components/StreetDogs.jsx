import { resolveStreetDogs } from '../lib/streetDogs.js';

// "Street Dogs of Dhaka" — reuses the process-card style (circular image +
// badge). Content is editable from the dashboard (site.streetDogs); falls
// back to defaults so the section always shows.
export default function StreetDogs({ data }) {
  const content = resolveStreetDogs(data);

  return (
    <section className="process-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2>{content.title}</h2>
          {content.intro && <p className="section-intro">{content.intro}</p>}
        </div>
        <div className="process-grid">
          {content.types.map((dog, i) => (
            <article key={dog.id ?? i} className="process-card">
              <div className="process-art">
                <div className="process-img" style={{ backgroundImage: `url(${dog.image})` }} />
                <span className="process-badge"><i className="fas fa-paw" /></span>
              </div>
              <h3>{dog.name}</h3>
              <p>{dog.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
