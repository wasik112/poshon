import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogPreview({ data, limit = 3 }) {
  const { t } = useTranslation();
  if (!data) return null;
  const visible = data.posts.slice(0, limit);
  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>{data.title}</h2>
          {data.intro && <p className="section-intro">{data.intro}</p>}
        </div>
        <div className="blog-grid">
          {visible.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="blog-card">
              <div className="blog-img" style={{ backgroundImage: `url(${post.image})` }} />
              <div className="blog-body">
                <div className="blog-meta">
                  <span><i className="fas fa-calendar" /> {formatDate(post.date)}</span>
                  {post.readMins && <span><i className="fas fa-clock" /> {t('blog.readMins', { mins: post.readMins })}</span>}
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <small className="blog-author">{t('blog.by', { author: post.author })}</small>
                <span className="blog-read-more">
                  {t('blog.readMore')} <i className="fas fa-arrow-right" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="section-cta">
          <Link className="btn btn-ghost" to="/blog">
            {t('blog.ctaAll')} <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
