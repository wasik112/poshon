export default function Services({ services }) {
  return (
    <section className="services-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{services.eyebrow}</span>
          <h2>{services.title}</h2>
        </div>
        <div className="services-grid">
          {services.items.map((item) => (
            <article key={item.title} className="service-card">
              <span className="service-icon">
                <i className={`fas ${item.icon}`} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
