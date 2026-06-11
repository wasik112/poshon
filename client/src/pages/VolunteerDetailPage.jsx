import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageData } from '../components/Layout.jsx';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function VolunteerDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { site } = usePageData();

  const volunteer = site.volunteers?.members?.find((v) => String(v.id) === String(id));
  if (!volunteer) return <Navigate to="/volunteers" replace />;

  const authorPosts = (site.blog?.posts || []).filter(
    (p) => p.author && p.author.toLowerCase() === volunteer.name.toLowerCase()
  );

  return (
    <main className="volunteer-detail-page">
      <section className="volunteer-detail-hero">
        <div className="container volunteer-detail-grid">
          <div
            className="volunteer-detail-photo"
            style={{ backgroundImage: `url(${volunteer.image})` }}
            role="img"
            aria-label={volunteer.name}
          />
          <div className="volunteer-detail-copy">
            <Link className="blog-back-link" to="/volunteers">
              <i className="fas fa-arrow-left" /> {t('volunteers.detail.back')}
            </Link>
            <span className="eyebrow">{volunteer.role}</span>
            <h1>{volunteer.name}</h1>
            <p className="volunteer-detail-contribution">{volunteer.contribution}</p>
            <Link className="btn btn-primary" to="/volunteers/apply">
              <i className="fas fa-hand-holding-heart" /> {t('volunteers.applyCta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="volunteer-posts-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t('volunteers.detail.postsEyebrow')}</span>
            <h2>{t('volunteers.detail.postsHeading', { name: volunteer.name })}</h2>
          </div>

          {authorPosts.length > 0 ? (
            <div className="blog-grid blog-grid-full">
              {authorPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="blog-card">
                  <div className="blog-img" style={{ backgroundImage: `url(${post.image})` }} />
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span><i className="fas fa-calendar" /> {formatDate(post.date)}</span>
                      {post.readMins && (
                        <span><i className="fas fa-clock" /> {t('blog.readMins', { mins: post.readMins })}</span>
                      )}
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="blog-read-more">
                      {t('blog.readMore')} <i className="fas fa-arrow-right" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="volunteer-posts-empty">
              <i className="fas fa-feather-pointed" />
              <p>{t('volunteers.detail.noPosts', { name: volunteer.name })}</p>
              <Link to="/blog" className="btn btn-ghost">
                {t('blog.ctaAll')} <i className="fas fa-arrow-right" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
