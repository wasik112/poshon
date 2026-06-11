import { usePageData } from '../components/Layout.jsx';

function toEmbedUrl(url) {
  if (!url) return '';
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
}

function PrototypeMedia({ image, video, name }) {
  if (video) {
    const embed = toEmbedUrl(video);
    if (embed.startsWith('http') && (embed.includes('youtube') || embed.includes('vimeo'))) {
      return (
        <div className="proto-media proto-media-video">
          <iframe
            src={embed}
            title={name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <div className="proto-media proto-media-video">
        <video src={embed} controls poster={image || undefined} />
      </div>
    );
  }
  return (
    <div className="proto-media proto-media-image" style={{ backgroundImage: `url(${image})` }} />
  );
}

export default function PrototypesPage() {
  const { site } = usePageData();
  const proto = site.prototypes || { items: [] };

  return (
    <main className="prototypes-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{proto.eyebrow}</span>
          <h1>{proto.title}</h1>
          {proto.intro && <p>{proto.intro}</p>}
        </div>
      </section>

      <section className="prototypes-section">
        <div className="container">
          <div className="prototypes-list">
            {proto.items.map((item, i) => (
              <article key={item.id} className={`proto-card ${i % 2 === 1 ? 'is-reversed' : ''}`}>
                <PrototypeMedia image={item.image} video={item.video} name={item.name} />
                <div className="proto-copy">
                  <span className="proto-number">{String(i + 1).padStart(2, '0')}</span>
                  <h2>{item.name}</h2>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>

          {proto.items.length === 0 && (
            <p className="proto-empty">No prototypes added yet. Edit the data file and reload.</p>
          )}
        </div>
      </section>
    </main>
  );
}
