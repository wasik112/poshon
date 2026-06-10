export default function Stats({ items }) {
  return (
    <section className="stats-section">
      <div className="container stats-grid">
        {items.map((item) => (
          <div key={item.label} className="stat-row">
            <span className="stat-num">{item.value}</span>
            <span className="stat-pill">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
