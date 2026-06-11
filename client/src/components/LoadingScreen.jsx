import { useTranslation } from 'react-i18next';

export default function LoadingScreen({ error, onRetry }) {
  const { t } = useTranslation();
  return (
    <div className="loading-screen">
      <div className="loading-mark">🐾</div>
      {error ? (
        <>
          <h2>{t('loading.errorTitle')}</h2>
          <p>{error.message}</p>
          <button className="btn btn-primary" onClick={onRetry}>
            {t('loading.retry')}
          </button>
        </>
      ) : (
        <>
          <h2>{t('loading.title')}</h2>
          <p>{t('loading.intro')}</p>
        </>
      )}
    </div>
  );
}
