const PROCESS_IMAGES = [
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=80'
];

export default function Process({ process }) {
  return (
    <section className="process-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2>{process.title}</h2>
        </div>
        <div className="process-grid">
          {process.steps.map((step, i) => (
            <article key={step.number} className="process-card">
              <div className="process-art">
                <div className="process-img" style={{ backgroundImage: `url(${PROCESS_IMAGES[i] || PROCESS_IMAGES[0]})` }} />
                <span className="process-badge">{step.number}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
