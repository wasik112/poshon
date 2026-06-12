import { useDashboard } from './DashboardProvider.jsx';

// Field helpers bound to a section object in content.site[sectionKey].
function useSection(sectionKey) {
  const { content, updateSite } = useDashboard();
  const section = content.site[sectionKey] || {};
  const set = (key, value) => updateSite(sectionKey, { ...section, [key]: value });
  return [section, set];
}

function Text({ label, value, onChange, area }) {
  return (
    <label className="dash-field">
      <span>{label}</span>
      {area
        ? <textarea rows={3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        : <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );
}

export default function SiteContentEditor() {
  const [brand, setBrand] = useSection('brand');
  const [about, setAbout] = useSection('about');
  const [cta, setCta] = useSection('cta');
  const [contact, setContact] = useSection('contact');
  const [footer, setFooter] = useSection('footer');

  return (
    <div className="dash-section">
      <div className="dash-section-head"><h2>Site Content</h2></div>
      <p className="dash-hint" style={{ marginTop: 0, marginBottom: 18 }}>
        <i className="fas fa-circle-info" /> The homepage banner is edited in its own
        <strong>&nbsp;Banner</strong> section.
      </p>

      <fieldset className="dash-fieldset">
        <legend>Brand</legend>
        <Text label="Name" value={brand.name} onChange={(v) => setBrand('name', v)} />
        <Text label="Tagline" value={brand.tagline} onChange={(v) => setBrand('tagline', v)} />
      </fieldset>

      <fieldset className="dash-fieldset">
        <legend>About</legend>
        <Text label="Title" value={about.title} onChange={(v) => setAbout('title', v)} />
        <Text label="Body" area value={about.body} onChange={(v) => setAbout('body', v)} />
      </fieldset>

      <fieldset className="dash-fieldset">
        <legend>Call to action</legend>
        <Text label="Title" value={cta.title} onChange={(v) => setCta('title', v)} />
        <Text label="Body" area value={cta.body} onChange={(v) => setCta('body', v)} />
      </fieldset>

      <fieldset className="dash-fieldset">
        <legend>Contact</legend>
        <Text label="Address" value={contact.address} onChange={(v) => setContact('address', v)} />
        <Text label="Phone" value={contact.phone} onChange={(v) => setContact('phone', v)} />
        <Text label="Email" value={contact.email} onChange={(v) => setContact('email', v)} />
        <Text label="Hours" value={contact.hours} onChange={(v) => setContact('hours', v)} />
      </fieldset>

      <fieldset className="dash-fieldset">
        <legend>Footer</legend>
        <Text label="Blurb" area value={footer.blurb} onChange={(v) => setFooter('blurb', v)} />
        <Text label="Copyright" value={footer.copyright} onChange={(v) => setFooter('copyright', v)} />
      </fieldset>
    </div>
  );
}
