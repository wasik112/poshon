import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import ServicesStrip from '../components/ServicesStrip.jsx';
import About from '../components/About.jsx';
import CallToAction from '../components/CallToAction.jsx';
import Process from '../components/Process.jsx';
import Stats from '../components/Stats.jsx';
import Services from '../components/Services.jsx';
import WaysToHelp from '../components/WaysToHelp.jsx';
import BlogPreview from '../components/BlogPreview.jsx';
import Events from '../components/Events.jsx';
import Partners from '../components/Partners.jsx';
import Locations from '../components/Locations.jsx';
import { usePageData } from '../components/Layout.jsx';

export default function HomePage() {
  const { site, locations } = usePageData();
  const navigate = useNavigate();
  const goToBooths = () => navigate('/booths');

  return (
    <main>
      <Hero hero={site.hero} onPrimary={goToBooths} />
      <ServicesStrip items={site.servicesStrip} />
      <About about={site.about} />
      <CallToAction cta={site.cta} />
      <Process process={site.process} />
      <Stats items={site.stats} />
      <Services services={site.services} />
      <WaysToHelp data={site.waysToHelp} />
      <BlogPreview data={site.blog} />
      <Events data={site.events} />
      <Partners data={site.partners} />
      <Locations locations={locations} onOpenMap={goToBooths} />
    </main>
  );
}
