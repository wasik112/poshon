export default function Events({ data }) {
  if (!data) return null;
  const bg = data.background
    ? `linear-gradient(rgba(20, 28, 36, 0.78), rgba(20, 28, 36, 0.78)), url(${data.background})`
    : 'linear-gradient(135deg, #1f2937, #111827)';

  return (
    <section className="events-section" style={{ background: bg, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container">
        <div className="section-head events-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>
            <span className="events-bar">||</span> {data.title}
          </h2>
        </div>
        <div className="events-grid">
          {data.items.map((event) => (
            <article key={event.id} className="event-card">
              <div className="event-date">
                <strong>{event.day}</strong>
                <small>{event.month}</small>
              </div>
              <div className="event-body">
                <h3>{event.name}</h3>
                <p>{event.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
