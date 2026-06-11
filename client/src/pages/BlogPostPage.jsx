import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageData } from '../components/Layout.jsx';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { site } = usePageData();

  const post = site.blog?.posts?.find((p) => String(p.id) === String(id));
  if (!post) return <Navigate to="/blog" replace />;

  const body = Array.isArray(post.content)
    ? post.content
    : post.content
      ? [post.content]
      : [post.excerpt];

  // Find the author across volunteers + activists for a clickable profile link
  const normalize = (s) => (s || '').toLowerCase().trim();
  const volunteerMatch = site.volunteers?.members?.find(
    (m) => normalize(m.name) === normalize(post.author)
  );
  const activistMatch = !volunteerMatch
    ? site.activists?.members?.find((m) => normalize(m.name) === normalize(post.author))
    : null;
  const authorLink = volunteerMatch
    ? `/volunteers/${volunteerMatch.id}`
    : activistMatch
      ? `/activists/${activistMatch.id}`
      : null;

  return (
    <main className="blog-post-page">
      <article>
        <section className="blog-post-hero">
          <div className="container">
            <Link className="blog-back-link" to="/blog">
              <i className="fas fa-arrow-left" /> {t('blog.back')}
            </Link>
            <div className="blog-post-meta">
              <span><i className="fas fa-calendar" /> {formatDate(post.date)}</span>
              {post.readMins && (
                <span><i className="fas fa-clock" /> {t('blog.readMins', { mins: post.readMins })}</span>
              )}
              <span>
                <i className="fas fa-user-pen" />{' '}
                {authorLink ? (
                  <Link to={authorLink} className="blog-author-link">
                    {t('blog.by', { author: post.author })}
                  </Link>
                ) : (
                  t('blog.by', { author: post.author })
                )}
              </span>
            </div>
            <h1>{post.title}</h1>
            <p className="blog-post-excerpt">{post.excerpt}</p>
          </div>
        </section>

        {post.image && (
          <div className="blog-post-hero-image-wrap container">
            <div
              className="blog-post-hero-image"
              style={{ backgroundImage: `url(${post.image})` }}
            />
          </div>
        )}

        <section className="blog-post-body">
          <div className="container">
            {body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <div className="blog-post-footer">
              <Link className="btn btn-ghost" to="/blog">
                <i className="fas fa-arrow-left" /> {t('blog.ctaAll')}
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
