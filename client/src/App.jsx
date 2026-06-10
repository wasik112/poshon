import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSiteData } from './hooks/useSiteData.js';
import Layout from './components/Layout.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import HomePage from './pages/HomePage.jsx';
import BoothsPage from './pages/BoothsPage.jsx';

export default function App() {
  const { site, locations, status, error, reload, setSite, setLocations } = useSiteData();

  if (status !== 'ready') {
    return <LoadingScreen error={status === 'error' ? error : null} onRetry={reload} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              site={site}
              locations={locations}
              setSite={setSite}
              setLocations={setLocations}
            />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/booths" element={<BoothsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
