export default function About({ about }) {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid">
        <div className="about-art">
          <div className="about-img" style={{ backgroundImage: `url(${about.image})` }} />
          <div className="about-badge">
            <strong>5K+</strong>
            <small>Dogs cared for</small>
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2>{about.title}</h2>
          <p>{about.body}</p>
          <ul className="about-bullets">
            {about.bullets.map((b) => (
              <li key={b}>
                <i className="fas fa-check" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
