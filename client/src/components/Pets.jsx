export default function Pets({ pets }) {
  return (
    <section id="pets" className="pets-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{pets.eyebrow}</span>
          <h2>{pets.title}</h2>
        </div>
        <div className="pets-grid">
          {pets.items.map((pet) => (
            <article key={pet.name} className="pet-card">
              <div className="pet-image" style={{ backgroundImage: `url(${pet.image})` }}>
                <span className="pet-age">{pet.age}</span>
              </div>
              <div className="pet-body">
                <h3>{pet.name}</h3>
                <p>{pet.description}</p>
                <a className="pet-link" href="#contact">
                  Adopt me <i className="fas fa-arrow-right" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
