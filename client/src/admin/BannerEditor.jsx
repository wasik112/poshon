import { useState } from 'react';
import { useDashboard } from './DashboardProvider.jsx';
import { getBanners } from '../lib/banners.js';

function nextId(items) {
  return items.reduce((m, i) => Math.max(m, Number(i.id) || 0), 0) + 1;
}

function blankBanner(items) {
  return {
    id: nextId(items),
    eyebrow: '',
    titleA: '',
    titleB: '',
    subtitle: '',
    image: '',
    primaryCta: { label: 'View Booth Locations', action: 'openMap' },
    secondaryCta: { label: '', href: '' },
    active: true
  };
}

export default function BannerEditor() {
  const { content, updateSite } = useDashboard();
  const banners = getBanners(content.site);
  const [editingId, setEditingId] = useState(null);
  const editing = banners.find((b) => b.id === editingId) || null;

  const commit = (next) => updateSite('banners', next);

  const addBanner = () => {
    const b = blankBanner(banners);
    commit([...banners, b]);
    setEditingId(b.id);
  };

  const deleteBanner = (id) => {
    if (!window.confirm('Delete this banner?')) return;
    commit(banners.filter((b) => b.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const toggleVisible = (id) =>
    commit(banners.map((b) => (b.id === id ? { ...b, active: b.active === false } : b)));
  const setField = (id, key, value) =>
    commit(banners.map((b) => (b.id === id ? { ...b, [key]: value } : b)));
  const setCta = (id, ctaKey, field, value) =>
    commit(banners.map((b) => (b.id === id ? { ...b, [ctaKey]: { ...(b[ctaKey] || {}), [field]: value } } : b)));

  return (
    <div className="dash-section">
      <div className="dash-section-head">
        <h2>Website Banners</h2>
        <button className="btn btn-primary dash-add" onClick={addBanner}>
          <i className="fas fa-plus" /> Add Banner
        </button>
      </div>

      {/* Table of all banners */}
      <div className="ov-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="ov-table banner-table">
          <thead>
            <tr><th>Banner</th><th>Title</th><th>In slider</th><th className="banner-actions-col">Actions</th></tr>
          </thead>
          <tbody>
            {banners.length === 0 && (
              <tr><td colSpan={4} className="ov-empty">No banners yet. Click “Add Banner”.</td></tr>
            )}
            {banners.map((b) => (
              <tr key={b.id} className={editingId === b.id ? 'is-editing' : ''}>
                <td>
                  <span className="banner-thumb" style={b.image ? { backgroundImage: `url(${b.image})` } : undefined}>
                    {!b.image && <i className="fas fa-image" />}
                  </span>
                </td>
                <td className="ov-td-title">{[b.titleA, b.titleB].filter(Boolean).join(' ') || 'Untitled'}</td>
                <td>
                  {b.active !== false
                    ? <button className="banner-vis is-on" onClick={() => toggleVisible(b.id)}><i className="fas fa-eye" /> Visible</button>
                    : <button className="banner-vis" onClick={() => toggleVisible(b.id)}><i className="fas fa-eye-slash" /> Hidden</button>}
                </td>
                <td>
                  <button className="dash-icon-btn" onClick={() => setEditingId(b.id)} aria-label="Edit"><i className="fas fa-pen" /></button>
                  <button className="dash-icon-btn" onClick={() => deleteBanner(b.id)} aria-label="Delete"><i className="fas fa-trash" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editor for the selected banner */}
      {editing && (
        <div className="banner-edit-panel">
          <div className="dash-section-head">
            <h3>Editing banner</h3>
            <button className="btn btn-ghost dash-add" onClick={() => setEditingId(null)}>
              <i className="fas fa-check" /> Done
            </button>
          </div>

          {/* Live preview */}
          <div className="banner-preview">
            <span className="bp-tag"><i className="fas fa-eye" /> Live preview</span>
            <div className="bp-grid">
              <div className="bp-copy">
                {editing.eyebrow && <span className="eyebrow">{editing.eyebrow}</span>}
                <h2 className="bp-title">
                  <span className="hero-title-accent">{editing.titleA}</span>
                  <br />{editing.titleB}
                </h2>
                <p>{editing.subtitle}</p>
                <div className="bp-actions">
                  <span className="btn btn-primary"><i className="fas fa-location-dot" /> {editing.primaryCta?.label || 'Primary'}</span>
                  <span className="btn btn-ghost">{editing.secondaryCta?.label || 'Secondary'}</span>
                </div>
              </div>
              <div className="bp-art" style={editing.image ? { backgroundImage: `url(${editing.image})` } : undefined}>
                {!editing.image && <span className="bp-art-empty"><i className="fas fa-image" /> No image</span>}
              </div>
            </div>
          </div>

          <fieldset className="dash-fieldset">
            <legend>Banner text</legend>
            <label className="dash-field"><span>Eyebrow (small text above title)</span>
              <input value={editing.eyebrow || ''} onChange={(e) => setField(editing.id, 'eyebrow', e.target.value)} /></label>
            <label className="dash-field"><span>Title — line 1 (highlighted in coral)</span>
              <input value={editing.titleA || ''} onChange={(e) => setField(editing.id, 'titleA', e.target.value)} /></label>
            <label className="dash-field"><span>Title — line 2</span>
              <input value={editing.titleB || ''} onChange={(e) => setField(editing.id, 'titleB', e.target.value)} /></label>
            <label className="dash-field"><span>Subtitle</span>
              <textarea rows={3} value={editing.subtitle || ''} onChange={(e) => setField(editing.id, 'subtitle', e.target.value)} /></label>
          </fieldset>

          <fieldset className="dash-fieldset">
            <legend>Banner image</legend>
            <label className="dash-field"><span>Image URL</span>
              <input type="url" value={editing.image || ''} onChange={(e) => setField(editing.id, 'image', e.target.value)} placeholder="https://images.unsplash.com/…" /></label>
            {editing.image && <span className="dash-img-preview" style={{ backgroundImage: `url(${editing.image})` }} />}
          </fieldset>

          <fieldset className="dash-fieldset">
            <legend>Buttons</legend>
            <label className="dash-field"><span>Primary button label</span>
              <input value={editing.primaryCta?.label || ''} onChange={(e) => setCta(editing.id, 'primaryCta', 'label', e.target.value)} /></label>
            <label className="dash-field"><span>Secondary button label</span>
              <input value={editing.secondaryCta?.label || ''} onChange={(e) => setCta(editing.id, 'secondaryCta', 'label', e.target.value)} /></label>
            <label className="dash-field"><span>Secondary button link</span>
              <input value={editing.secondaryCta?.href || ''} onChange={(e) => setCta(editing.id, 'secondaryCta', 'href', e.target.value)} placeholder="#pets or /contact" /></label>
          </fieldset>
        </div>
      )}
    </div>
  );
}
