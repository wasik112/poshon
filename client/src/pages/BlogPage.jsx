import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageData } from '../components/Layout.jsx';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  const { t } = useTranslation();
  const { site } = usePageData();
  const blog = site.blog;
  if (!blog) return null;

  return (
    <main className="blog-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{blog.eyebrow}</span>
          <h1>{blog.title}</h1>
          {blog.intro && <p>{blog.intro}</p>}
        </div>
      </section>

      <section className="blog-full-section">
        <div className="container">
          <div className="blog-grid blog-grid-full">
            {blog.posts.map((post) => (
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
        </div>
      </section>
    </main>
  );
}
