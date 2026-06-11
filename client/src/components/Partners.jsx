export default function Partners({ data }) {
  if (!data) return null;
  return (
    <section className="partners-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 className="partners-title">{data.title}</h2>
          {data.intro && <p className="section-intro">{data.intro}</p>}
        </div>
        <div className="partners-grid">
          {data.items.map((partner) => (
            <div key={partner.id} className="partner-logo" title={partner.name}>
              {partner.image ? (
                <img src={partner.image} alt={partner.name} />
              ) : (
                <span>{partner.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
