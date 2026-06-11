import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageData } from '../components/Layout.jsx';

export default function ContactPage() {
  const { t } = useTranslation();
  const { site } = usePageData();
  const { contact } = site;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const update = (field) => (event) =>
    setForm((f) => ({ ...f, [field]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const cards = [
    { icon: 'fa-location-dot', label: t('contact.cards.visit'), value: contact.address },
    { icon: 'fa-phone', label: t('contact.cards.call'), value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: 'fa-envelope', label: t('contact.cards.email'), value: contact.email, href: `mailto:${contact.email}` },
    { icon: 'fa-clock', label: t('contact.cards.hours'), value: contact.hours }
  ];

  return (
    <main className="contact-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t('contact.heroEyebrow')}</span>
          <h1>{t('contact.heroTitle')}</h1>
          <p>{t('contact.heroIntro')}</p>
        </div>
      </section>

      <section className="contact-cards-section">
        <div className="container">
          <div className="contact-cards">
            {cards.map((card) => (
              <article key={card.label} className="contact-card">
                <span className="contact-card-icon">
                  <i className={`fas ${card.icon}`} />
                </span>
                <small>{card.label}</small>
                {card.href ? <a href={card.href}>{card.value}</a> : <strong>{card.value}</strong>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container contact-form-grid">
          <div className="contact-form-copy">
            <span className="eyebrow">{t('contact.form.sectionEyebrow')}</span>
            <h2>{t('contact.form.sectionTitle')}</h2>
            <p>{t('contact.form.sectionIntro', { phone: contact.phone })}</p>
            <ul className="contact-form-bullets">
              <li><i className="fas fa-check" /> {t('contact.form.bullets.adoption')}</li>
              <li><i className="fas fa-check" /> {t('contact.form.bullets.volunteer')}</li>
              <li><i className="fas fa-check" /> {t('contact.form.bullets.sponsor')}</li>
              <li><i className="fas fa-check" /> {t('contact.form.bullets.media')}</li>
            </ul>
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
            <label>
              <span>{t('contact.form.subject')}</span>
              <input
                type="text"
                value={form.subject}
                onChange={update('subject')}
                placeholder={t('contact.form.subjectPlaceholder')}
              />
            </label>
            <label>
              <span>{t('contact.form.message')} {t('common.required')}</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder={t('contact.form.messagePlaceholder')}
                required
              />
            </label>

            <button className="btn btn-primary btn-xl" type="submit">
              <i className="fas fa-paper-plane" /> {t('contact.form.send')}
            </button>

            {status === 'sent' && (
              <p className="form-msg form-msg-ok">
                <i className="fas fa-circle-check" /> {t('contact.form.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="form-msg form-msg-err">
                <i className="fas fa-triangle-exclamation" /> {t('contact.form.error')}
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
