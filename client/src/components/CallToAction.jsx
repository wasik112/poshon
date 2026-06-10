export default function CallToAction({ cta }) {
  return (
    <section className="cta-banner">
      <div className="container cta-row">
        <div>
          <h2>{cta.title}</h2>
          <p>{cta.body}</p>
        </div>
        <a className="btn btn-primary" href={cta.button.href}>
          {cta.button.label} <i className="fas fa-arrow-right" />
        </a>
      </div>
    </section>
  );
}
