const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) {
    throw new Error(`API ${options.method || 'GET'} ${path} failed (${response.status})`);
  }
  return response.json();
}

export const api = {
  getSite: () => request('/site'),
  getLocations: () => request('/locations'),
  updateSite: (site) =>
    request('/site', { method: 'PUT', body: JSON.stringify(site) }),
  updateLocations: (locations) =>
    request('/locations', { method: 'PUT', body: JSON.stringify(locations) })
};
