import { Link } from 'react-router-dom';
import { useDashboard } from './DashboardProvider.jsx';

export default function DashboardOverview() {
  const { content } = useDashboard();
  const s = content.site;
  const locations = content.locations || [];

  const counts = {
    booths: locations.length,
    volunteers: s.volunteers?.members?.length ?? 0,
    activists: s.activists?.members?.length ?? 0,
    team: s.team?.members?.length ?? 0,
    blog: s.blog?.posts?.length ?? 0,
    partners: s.partners?.items?.length ?? 0
  };

  const stats = [
    { label: 'Booth Locations', value: counts.booths, icon: 'fa-location-dot', to: '/admin/booths', tone: 'a' },
    { label: 'Volunteers', value: counts.volunteers, icon: 'fa-hand-holding-heart', to: '/admin/volunteers', tone: 'b' },
    { label: 'Blog Posts', value: counts.blog, icon: 'fa-newspaper', to: '/admin/blog', tone: 'c' }
  ];

  // Content chart (real counts per section)
  const chart = [
    { label: 'Booths', value: counts.booths },
    { label: 'Volunteers', value: counts.volunteers },
    { label: 'Activists', value: counts.activists },
    { label: 'Team', value: counts.team },
    { label: 'Blog', value: counts.blog },
    { label: 'Partners', value: counts.partners }
  ];
  const chartMax = Math.max(1, ...chart.map((c) => c.value));

  // Completeness gauge: how many sections have at least one item
  const sectionVals = Object.values(counts);
  const filled = sectionVals.filter((v) => v > 0).length;
  const totalItems = sectionVals.reduce((a, b) => a + b, 0);
  const pct = Math.round((filled / sectionVals.length) * 100);

  // Recent blog posts
  const recent = [...(s.blog?.posts || [])]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 5);

  // Map bbox covering all booths (or default Dhaka)
  const lats = locations.map((l) => Number(l.lat)).filter(Number.isFinite);
  const lngs = locations.map((l) => Number(l.lng)).filter(Number.isFinite);
  const cLat = lats.length ? lats.reduce((a, b) => a + b, 0) / lats.length : 23.78;
  const cLng = lngs.length ? lngs.reduce((a, b) => a + b, 0) / lngs.length : 90.39;
  const bbox = [cLng - 0.08, cLat - 0.06, cLng + 0.08, cLat + 0.06].join('%2C');

  return (
    <div className="dash-overview">
      <div className="dash-grid">
        {/* LEFT column */}
        <div className="dash-col">
          <div className="dash-statrow">
            {stats.map((c) => (
              <Link key={c.label} to={c.to} className={`ov-stat ov-stat-${c.tone}`}>
                <span className="ov-stat-icon"><i className={`fas ${c.icon}`} /></span>
                <small>{c.label}</small>
                <strong>{c.value}</strong>
                <span className="ov-stat-tag"><i className="fas fa-circle" /> Live on site</span>
              </Link>
            ))}
          </div>

          <div className="ov-card">
            <div className="ov-card-head">
              <h3>Content Overview</h3>
              <span className="ov-pill">By section</span>
            </div>
            <div className="ov-chart">
              {chart.map((c) => (
                <div key={c.label} className="ov-bar-col">
                  <div className="ov-bar-track">
                    <div className="ov-bar" style={{ height: `${(c.value / chartMax) * 100}%` }}>
                      <span className="ov-bar-val">{c.value}</span>
                    </div>
                  </div>
                  <small>{c.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="ov-card">
            <div className="ov-card-head">
              <h3>Recent Blog Posts</h3>
              <Link to="/admin/blog" className="ov-pill ov-pill-link">Manage</Link>
            </div>
            <table className="ov-table">
              <thead>
                <tr><th>Title</th><th>Author</th><th>Date</th><th>Read</th></tr>
              </thead>
              <tbody>
                {recent.length === 0 && (
                  <tr><td colSpan={4} className="ov-empty">No posts yet.</td></tr>
                )}
                {recent.map((p) => (
                  <tr key={p.id}>
                    <td className="ov-td-title">{p.title}</td>
                    <td>{p.author || '—'}</td>
                    <td>{p.date || '—'}</td>
                    <td>{p.readMins ? `${p.readMins} min` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT column */}
        <div className="dash-col">
          <div className="ov-card ov-target">
            <div className="ov-card-head">
              <h3>Content Status</h3>
            </div>
            <div
              className="ov-gauge"
              style={{ background: `conic-gradient(var(--brand) ${pct}%, #ffe6df 0)` }}
            >
              <div className="ov-gauge-hole">
                <strong>{pct}%</strong>
                <small>sections filled</small>
              </div>
            </div>
            <p className="ov-target-note">
              {filled} of {sectionVals.length} sections have content.
            </p>
            <div className="ov-target-stats">
              <div><small>Total items</small><strong>{totalItems}</strong></div>
              <div><small>Sections</small><strong>{sectionVals.length}</strong></div>
            </div>
          </div>

          <div className="ov-card ov-map-card">
            <div className="ov-card-head">
              <h3>Booth Map</h3>
              <Link to="/admin/booths" className="ov-pill ov-pill-link">Edit</Link>
            </div>
            <iframe
              title="Booth locations"
              className="ov-map"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`}
            />
            <p className="ov-map-note"><i className="fas fa-location-dot" /> {counts.booths} active booths</p>
          </div>
        </div>
      </div>
    </div>
  );
}
