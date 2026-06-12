import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/AuthProvider.jsx';
import { logout } from '../services/auth.js';

export default function AccountPage() {
  const { t } = useTranslation();
  const { user, profile, role, ready } = useAuth();

  if (!ready) {
    return (
      <main className="auth-page">
        <section className="contact-form-section">
          <div className="container"><p>{t('loading.title')}</p></div>
        </section>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: '/account' }} />;
  }

  const displayName = profile?.name || user.displayName || user.email;

  return (
    <main className="auth-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t('auth.account')}</span>
          <h1>{t('auth.accountTitle')}</h1>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container auth-form-wrap">
          <div className="account-card">
            <div className="account-avatar"><i className="fas fa-user" /></div>
            <div className="account-info">
              <h3>{displayName}</h3>
              <p><i className="fas fa-envelope" /> {user.email}</p>
              {role && (
                <p>
                  <i className="fas fa-id-badge" /> {t('auth.accountRole')}:{' '}
                  <span className={`role-badge role-${role}`}>{t(`auth.role${role.charAt(0).toUpperCase()}${role.slice(1)}`, role)}</span>
                </p>
              )}
            </div>
          </div>

          <button className="btn btn-ghost" onClick={() => logout()}>
            <i className="fas fa-right-from-bracket" /> {t('auth.logout')}
          </button>
        </div>
      </section>
    </main>
  );
}
