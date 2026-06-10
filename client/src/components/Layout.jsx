import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AdminPanel from './AdminPanel.jsx';

export default function Layout({ site, locations, setSite, setLocations }) {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="app-shell">
      <Header
        brand={site.brand}
        nav={site.nav}
        topContact={site.topContact}
        onToggleAdmin={() => setAdminOpen((v) => !v)}
        adminMode={adminOpen}
      />

      <Outlet context={{ site, locations }} />

      <Footer brand={site.brand} footer={site.footer} contact={site.contact} />

      {adminOpen && (
        <AdminPanel
          site={site}
          locations={locations}
          onClose={() => setAdminOpen(false)}
          onSaved={(newSite, newLocations) => {
            setSite(newSite);
            setLocations(newLocations);
          }}
        />
      )}
    </div>
  );
}

export function usePageData() {
  return useOutletContext();
}
