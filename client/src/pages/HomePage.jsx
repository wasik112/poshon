import { useNavigate } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider.jsx';
import ServicesStrip from '../components/ServicesStrip.jsx';
import About from '../components/About.jsx';
import CallToAction from '../components/CallToAction.jsx';
import StreetDogs from '../components/StreetDogs.jsx';
import Stats from '../components/Stats.jsx';
import Services from '../components/Services.jsx';
import WaysToHelp from '../components/WaysToHelp.jsx';
import BlogPreview from '../components/BlogPreview.jsx';
import Events from '../components/Events.jsx';
import Partners from '../components/Partners.jsx';
import Locations from '../components/Locations.jsx';
import { usePageData } from '../components/Layout.jsx';
import { getVisibleBanners } from '../lib/banners.js';

export default function HomePage() {
  const { site, locations } = usePageData();
  const navigate = useNavigate();
  const goToBooths = () => navigate('/booths');

  return (
    <main>
      <HeroSlider banners={getVisibleBanners(site)} onPrimary={goToBooths} />
      <ServicesStrip items={site.servicesStrip} />
      <About about={site.about} />
      <CallToAction cta={site.cta} />
      <StreetDogs data={site.streetDogs} />
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
