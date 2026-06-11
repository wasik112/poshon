import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageData } from '../components/Layout.jsx';

export default function VolunteersPage() {
  const { t } = useTranslation();
  const { site } = usePageData();
  const data = site.volunteers;
  if (!data) return null;

  return (
    <main className="volunteers-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{data.eyebrow}</span>
          <h1>{data.title}</h1>
          {data.intro && <p>{data.intro}</p>}
          <div className="page-hero-cta">
            <Link className="btn btn-primary btn-xl" to="/volunteers/apply">
              <i className="fas fa-hand-holding-heart" />
              {t('volunteers.applyCta')}
              <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      <section className="volunteers-section">
        <div className="container">
          <div className="volunteers-grid">
            {data.members.map((v) => (
              <Link key={v.id} to={`/volunteers/${v.id}`} className="volunteer-card">
                <div className="volunteer-photo" style={{ backgroundImage: `url(${v.image})` }} />
                <div className="volunteer-body">
                  <h3>{v.name}</h3>
                  <small>{v.role}</small>
                  <p>{v.contribution}</p>
                  <span className="blog-read-more">
                    {t('volunteers.detail.viewProfile')} <i className="fas fa-arrow-right" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
