import { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/AuthProvider.jsx';
import { login } from '../services/auth.js';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, ready } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const redirectTo = location.state?.from || '/account';

  if (ready && user) return <Navigate to={redirectTo} replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(form.email.trim(), form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(`${t('auth.loginFailed')}: ${err.code || err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t('auth.login')}</span>
          <h1>{t('auth.loginTitle')}</h1>
          <p>{t('auth.loginIntro')}</p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container auth-form-wrap">
          <form className="contact-form" onSubmit={submit} noValidate>
            <label>
              <span>{t('auth.email')} {t('common.required')}</span>
              <input type="email" value={form.email} onChange={update('email')} autoComplete="username" required />
            </label>
            <label>
              <span>{t('auth.password')} {t('common.required')}</span>
              <input type="password" value={form.password} onChange={update('password')} autoComplete="current-password" required />
            </label>

            <button className="btn btn-primary btn-xl" type="submit" disabled={busy}>
              <i className="fas fa-right-to-bracket" /> {busy ? t('auth.signingIn') : t('auth.submitLogin')}
            </button>

            {error && (
              <p className="form-msg form-msg-err">
                <i className="fas fa-triangle-exclamation" /> {error}
              </p>
            )}

            <p className="auth-switch">
              {t('auth.noAccount')} <Link to="/register">{t('auth.register')}</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
