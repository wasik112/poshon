import { Outlet, useOutletContext } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout({ site, locations }) {
  return (
    <div className="app-shell">
      <Header brand={site.brand} nav={site.nav} topContact={site.topContact} />
      <Outlet context={{ site, locations }} />
      <Footer brand={site.brand} footer={site.footer} contact={site.contact} />
    </div>
  );
}

export function usePageData() {
  return useOutletContext();
}
