export default function ServicesStrip({ items }) {
  return (
    <section className="services-strip">
      <div className="container services-strip-grid">
        {items.map((item) => (
          <article key={item.title} className="strip-card">
            <span className="strip-icon">
              <i className={`fas ${item.icon}`} />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
