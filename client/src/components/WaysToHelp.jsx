import { Link } from 'react-router-dom';

export default function WaysToHelp({ data }) {
  if (!data) return null;
  return (
    <section className="help-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>{data.title}</h2>
          {data.intro && <p className="section-intro">{data.intro}</p>}
        </div>
        <div className="help-grid">
          {data.items.map((item, i) => (
            <article key={item.title} className={`help-card ${i === 1 ? 'is-featured' : ''}`}>
              <span className="help-icon">
                <i className={`fas ${item.icon}`} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link className="btn btn-primary help-cta" to={item.href}>
                {item.cta} <i className="fas fa-arrow-right" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
