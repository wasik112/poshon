import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/AuthProvider.jsx';
import { register } from '../services/auth.js';
import { ROLES } from '../services/users.js';

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, ready } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLES.VOLUNTEER
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (ready && user) return <Navigate to="/account" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role
      });
      navigate('/account', { replace: true });
    } catch (err) {
      setError(`${t('auth.registerFailed')}: ${err.code || err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t('auth.register')}</span>
          <h1>{t('auth.registerTitle')}</h1>
          <p>{t('auth.registerIntro')}</p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container auth-form-wrap">
          <form className="contact-form" onSubmit={submit} noValidate>
            <label>
              <span>{t('auth.name')} {t('common.required')}</span>
              <input type="text" value={form.name} onChange={update('name')} autoComplete="name" required />
            </label>
            <label>
              <span>{t('auth.email')} {t('common.required')}</span>
              <input type="email" value={form.email} onChange={update('email')} autoComplete="email" required />
            </label>
            <label>
              <span>{t('auth.password')} {t('common.required')}</span>
              <input type="password" value={form.password} onChange={update('password')} autoComplete="new-password" minLength={6} required />
            </label>

            <div className="form-checkbox-group">
              <span className="form-checkbox-legend">{t('auth.role')}</span>
              <div className="auth-role-toggle">
                <label className={`auth-role-option ${form.role === ROLES.VOLUNTEER ? 'is-active' : ''}`}>
                  <input type="radio" name="role" value={ROLES.VOLUNTEER}
                    checked={form.role === ROLES.VOLUNTEER} onChange={update('role')} />
                  <i className="fas fa-hand-holding-heart" /> {t('auth.roleVolunteer')}
                </label>
                <label className={`auth-role-option ${form.role === ROLES.ACTIVIST ? 'is-active' : ''}`}>
                  <input type="radio" name="role" value={ROLES.ACTIVIST}
                    checked={form.role === ROLES.ACTIVIST} onChange={update('role')} />
                  <i className="fas fa-bullhorn" /> {t('auth.roleActivist')}
                </label>
              </div>
            </div>

            <button className="btn btn-primary btn-xl" type="submit" disabled={busy}>
              <i className="fas fa-user-plus" /> {busy ? t('auth.creating') : t('auth.submitRegister')}
            </button>

            {error && (
              <p className="form-msg form-msg-err">
                <i className="fas fa-triangle-exclamation" /> {error}
              </p>
            )}

            <p className="auth-switch">
              {t('auth.haveAccount')} <Link to="/login">{t('auth.login')}</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
