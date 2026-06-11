import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageData } from '../components/Layout.jsx';

export default function ActivistsPage() {
  const { t } = useTranslation();
  const { site } = usePageData();
  const data = site.activists;
  if (!data) return null;

  return (
    <main className="activists-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{data.eyebrow}</span>
          <h1>{data.title}</h1>
          {data.intro && <p>{data.intro}</p>}
        </div>
      </section>

      <section className="volunteers-section">
        <div className="container">
          <div className="volunteers-grid">
            {data.members.map((a) => (
              <Link key={a.id} to={`/activists/${a.id}`} className="volunteer-card">
                <div className="volunteer-photo" style={{ backgroundImage: `url(${a.image})` }} />
                <div className="volunteer-body">
                  <h3>{a.name}</h3>
                  <small>{a.role}</small>
                  <p>{a.bio}</p>
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
