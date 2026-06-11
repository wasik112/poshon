import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AREAS = ['rescue', 'booth', 'medical', 'admin', 'other'];
const DAYS = ['weekdays', 'saturday', 'sunday'];

export default function VolunteerApplyPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    area: 'rescue',
    days: [],
    why: ''
  });
  const [status, setStatus] = useState('idle');

  const update = (field) => (event) =>
    setForm((f) => ({ ...f, [field]: event.target.value }));

  const toggleDay = (day) => () =>
    setForm((f) => ({
      ...f,
      days: f.days.includes(day) ? f.days.filter((d) => d !== day) : [...f.days, day]
    }));

  const submit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.why) {
      setStatus('error');
      return;
    }
    setStatus('sent');
    setForm({ name: '', email: '', phone: '', age: '', area: 'rescue', days: [], why: '' });
  };

  return (
    <main className="volunteer-apply-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t('volunteers.apply.eyebrow')}</span>
          <h1>{t('volunteers.apply.title')}</h1>
          <p>{t('volunteers.apply.intro')}</p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container contact-form-grid">
          <div className="contact-form-copy">
            <span className="eyebrow">{t('volunteers.apply.whyEyebrow')}</span>
            <h2>{t('volunteers.apply.whyTitle')}</h2>
            <p>{t('volunteers.apply.whyBody')}</p>
            <ul className="contact-form-bullets">
              <li><i className="fas fa-check" /> {t('volunteers.apply.bullets.training')}</li>
              <li><i className="fas fa-check" /> {t('volunteers.apply.bullets.flexible')}</li>
              <li><i className="fas fa-check" /> {t('volunteers.apply.bullets.community')}</li>
              <li><i className="fas fa-check" /> {t('volunteers.apply.bullets.impact')}</li>
            </ul>
            <Link to="/volunteers" className="btn btn-link">
              <i className="fas fa-arrow-left" /> {t('volunteers.apply.backToList')}
            </Link>
          </div>

          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="form-row">
              <label>
                <span>{t('contact.form.name')} {t('common.required')}</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                />
              </label>
              <label>
                <span>{t('contact.form.email')} {t('common.required')}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span>{t('volunteers.apply.form.phone')}</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="+880..."
                />
              </label>
              <label>
                <span>{t('volunteers.apply.form.age')}</span>
                <input
                  type="number"
                  value={form.age}
                  onChange={update('age')}
                  min="14"
                  max="99"
                  placeholder="22"
                />
              </label>
            </div>
            <label>
              <span>{t('volunteers.apply.form.area')}</span>
              <select value={form.area} onChange={update('area')}>
                {AREAS.map((a) => (
                  <option key={a} value={a}>{t(`volunteers.apply.areas.${a}`)}</option>
                ))}
              </select>
            </label>
            <div className="form-checkbox-group">
              <span className="form-checkbox-legend">{t('volunteers.apply.form.days')}</span>
              <div className="form-checkbox-row">
                {DAYS.map((d) => (
                  <label key={d} className="form-checkbox">
                    <input
                      type="checkbox"
                      checked={form.days.includes(d)}
                      onChange={toggleDay(d)}
                    />
                    <span>{t(`volunteers.apply.dayLabels.${d}`)}</span>
                  </label>
                ))}
              </div>
            </div>
            <label>
              <span>{t('volunteers.apply.form.why')} {t('common.required')}</span>
              <textarea
                rows={5}
                value={form.why}
                onChange={update('why')}
                placeholder={t('volunteers.apply.form.whyPlaceholder')}
                required
              />
            </label>

            <button className="btn btn-primary btn-xl" type="submit">
              <i className="fas fa-paper-plane" /> {t('volunteers.apply.form.submit')}
            </button>

            {status === 'sent' && (
              <p className="form-msg form-msg-ok">
                <i className="fas fa-circle-check" /> {t('volunteers.apply.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="form-msg form-msg-err">
                <i className="fas fa-triangle-exclamation" /> {t('volunteers.apply.error')}
              </p>
            )}
            <p className="form-disclaimer">
              <i className="fas fa-circle-info" /> {t('contact.form.demoNote')}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
