import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api.js';

export function useSiteData() {
  const [site, setSite] = useState(null);
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const [siteData, locationData] = await Promise.all([
        api.getSite(),
        api.getLocations()
      ]);
      setSite(siteData);
      setLocations(locationData);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { site, locations, status, error, reload: load, setSite, setLocations };
}
