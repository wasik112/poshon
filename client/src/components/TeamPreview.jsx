import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TeamPreview({ data, limit = 4 }) {
  const { t } = useTranslation();
  if (!data) return null;
  const visible = data.members.slice(0, limit);
  return (
    <section id="team" className="team-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>{data.title}</h2>
          {data.intro && <p className="section-intro">{data.intro}</p>}
        </div>
        <div className="team-grid">
          {visible.map((m) => (
            <article key={m.id} className="team-card">
              <div className="team-photo" style={{ backgroundImage: `url(${m.image})` }} />
              <div className="team-body">
                <h3>{m.name}</h3>
                <small>{m.role}</small>
                <p>{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="section-cta">
          <Link className="btn btn-ghost" to="/team">
            {t('team.ctaFull')} <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
