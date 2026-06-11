import { useTranslation } from 'react-i18next';
import About from '../components/About.jsx';
import Stats from '../components/Stats.jsx';
import CallToAction from '../components/CallToAction.jsx';
import { usePageData } from '../components/Layout.jsx';

export default function AboutPage() {
  const { t } = useTranslation();
  const { site } = usePageData();

  return (
    <main className="about-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{site.about.eyebrow}</span>
          <h1>{site.about.title}</h1>
          <p>{t('about.pageIntro')}</p>
        </div>
      </section>

      <About about={site.about} />
      <Stats items={site.stats} />
      <CallToAction cta={site.cta} />
    </main>
  );
}
