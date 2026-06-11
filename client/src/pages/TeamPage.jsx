import { usePageData } from '../components/Layout.jsx';

export default function TeamPage() {
  const { site } = usePageData();
  const team = site.team;
  if (!team) return null;

  return (
    <main className="team-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{team.eyebrow}</span>
          <h1>{team.title}</h1>
          {team.intro && <p>{team.intro}</p>}
        </div>
      </section>

      <section className="team-full-section">
        <div className="container">
          <div className="team-grid team-grid-full">
            {team.members.map((m) => (
              <article key={m.id} className="team-card">
                <div className="team-photo" style={{ backgroundImage: `url(${m.image})` }} />
                <div className="team-body">
                  <h3>{m.name}</h3>
                  <small>{m.role}</small>
                  <p>{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
