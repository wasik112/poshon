import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageData } from '../components/Layout.jsx';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ActivistDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { site } = usePageData();

  const activist = site.activists?.members?.find((a) => String(a.id) === String(id));
  if (!activist) return <Navigate to="/activists" replace />;

  const authorPosts = (site.blog?.posts || []).filter(
    (p) => p.author && p.author.toLowerCase() === activist.name.toLowerCase()
  );

  return (
    <main className="volunteer-detail-page">
      <section className="volunteer-detail-hero">
        <div className="container volunteer-detail-grid">
          <div
            className="volunteer-detail-photo"
            style={{ backgroundImage: `url(${activist.image})` }}
            role="img"
            aria-label={activist.name}
          />
          <div className="volunteer-detail-copy">
            <Link className="blog-back-link" to="/activists">
              <i className="fas fa-arrow-left" /> {t('activists.detail.back')}
            </Link>
            <span className="eyebrow">{activist.role}</span>
            <h1>{activist.name}</h1>
            <p className="volunteer-detail-contribution">{activist.bio}</p>
          </div>
        </div>
      </section>

      <section className="volunteer-posts-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t('volunteers.detail.postsEyebrow')}</span>
            <h2>{t('volunteers.detail.postsHeading', { name: activist.name })}</h2>
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
              <p>{t('volunteers.detail.noPosts', { name: activist.name })}</p>
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
