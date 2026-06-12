import { useState } from 'react';

// Generic add/edit/delete editor for an array of objects.
//
// Props:
//   title       – section heading
//   items       – array of records (each ideally with an `id`)
//   schema      – [{ key, label, type }] where type is
//                 text | textarea | number | image | stringList
//   onChange    – (nextItems) => void
//   labelKey    – which field to show as each card's title (default 'name')
function nextId(items) {
  const max = items.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0);
  return max + 1;
}

function blankRecord(schema, items) {
  const rec = { id: nextId(items) };
  for (const f of schema) {
    rec[f.key] = f.type === 'stringList' ? [] : f.type === 'number' ? 0 : '';
  }
  return rec;
}

export default function CollectionEditor({ title, items = [], schema, onChange, labelKey = 'name' }) {
  const [openId, setOpenId] = useState(null);

  const setField = (index, key, value) => {
    const next = items.map((it, i) => (i === index ? { ...it, [key]: value } : it));
    onChange(next);
  };

  const addItem = () => {
    const rec = blankRecord(schema, items);
    onChange([...items, rec]);
    setOpenId(rec.id);
  };

  const removeItem = (index) => {
    if (!window.confirm('Delete this item?')) return;
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="dash-section">
      <div className="dash-section-head">
        <h2>{title}</h2>
        <button className="btn btn-primary dash-add" onClick={addItem}>
          <i className="fas fa-plus" /> Add
        </button>
      </div>

      {items.length === 0 && <p className="dash-empty">No items yet. Click “Add” to create one.</p>}

      <div className="dash-cards">
        {items.map((item, index) => {
          const open = openId === (item.id ?? index);
          return (
            <div key={item.id ?? index} className={`dash-card ${open ? 'is-open' : ''}`}>
              <div className="dash-card-head" onClick={() => setOpenId(open ? null : (item.id ?? index))}>
                {item.image && <span className="dash-card-thumb" style={{ backgroundImage: `url(${item.image})` }} />}
                <strong>{item[labelKey] || item.title || `Item ${index + 1}`}</strong>
                <span className="dash-card-actions">
                  <button className="dash-icon-btn" onClick={(e) => { e.stopPropagation(); removeItem(index); }} aria-label="Delete">
                    <i className="fas fa-trash" />
                  </button>
                  <i className={`fas fa-chevron-${open ? 'up' : 'down'}`} />
                </span>
              </div>

              {open && (
                <div className="dash-card-body">
                  {schema.map((f) => (
                    <Field
                      key={f.key}
                      field={f}
                      value={item[f.key]}
                      onChange={(v) => setField(index, f.key, v)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ field, value, onChange }) {
  const { label, type } = field;

  if (type === 'textarea') {
    return (
      <label className="dash-field">
        <span>{label}</span>
        <textarea rows={3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      </label>
    );
  }

  if (type === 'number') {
    return (
      <label className="dash-field">
        <span>{label}</span>
        <input type="number" step="any" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />
      </label>
    );
  }

  if (type === 'image') {
    return (
      <label className="dash-field">
        <span>{label} (image URL)</span>
        <input type="url" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="https://…" />
        {value && <span className="dash-img-preview" style={{ backgroundImage: `url(${value})` }} />}
      </label>
    );
  }

  if (type === 'stringList') {
    const list = Array.isArray(value) ? value : [];
    const setAt = (i, v) => onChange(list.map((s, idx) => (idx === i ? v : s)));
    return (
      <div className="dash-field">
        <span>{label}</span>
        {list.map((para, i) => (
          <div key={i} className="dash-list-row">
            <textarea rows={2} value={para} onChange={(e) => setAt(i, e.target.value)} />
            <button className="dash-icon-btn" onClick={() => onChange(list.filter((_, idx) => idx !== i))} aria-label="Remove">
              <i className="fas fa-xmark" />
            </button>
          </div>
        ))}
        <button className="btn btn-ghost dash-list-add" onClick={() => onChange([...list, ''])}>
          <i className="fas fa-plus" /> Add paragraph
        </button>
      </div>
    );
  }

  return (
    <label className="dash-field">
      <span>{label}</span>
      <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
