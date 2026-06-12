import { useDashboard } from './DashboardProvider.jsx';
import CollectionEditor from './CollectionEditor.jsx';
import { resolveStreetDogs } from '../lib/streetDogs.js';

export default function StreetDogsEditor() {
  const { content, updateSite } = useDashboard();
  const data = resolveStreetDogs(content.site.streetDogs);

  // Persist the whole section so untouched fields (filled from defaults) are
  // saved too — keeps the public section in sync.
  const set = (patch) => updateSite('streetDogs', { ...data, ...patch });

  return (
    <div className="dash-section">
      <div className="dash-section-head"><h2>Street Dogs</h2></div>

      <fieldset className="dash-fieldset">
        <legend>Section heading</legend>
        <label className="dash-field">
          <span>Eyebrow (small text above title)</span>
          <input value={data.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} />
        </label>
        <label className="dash-field">
          <span>Title</span>
          <input value={data.title} onChange={(e) => set({ title: e.target.value })} />
        </label>
        <label className="dash-field">
          <span>Intro</span>
          <textarea rows={3} value={data.intro} onChange={(e) => set({ intro: e.target.value })} />
        </label>
      </fieldset>

      <CollectionEditor
        title="Dog Types"
        items={data.types}
        onChange={(types) => set({ types })}
        schema={[
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'body', label: 'Description', type: 'textarea' },
          { key: 'image', label: 'Photo', type: 'image' }
        ]}
      />
    </div>
  );
}
