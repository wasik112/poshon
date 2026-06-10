import { site } from './_data.js';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(site);
  }
  if (req.method === 'PUT') {
    // Vercel serverless = stateless. This won't persist across cold starts.
    // For real admin editing on Vercel, add a database in Phase 2.
    const updates = req.body || {};
    return res.status(200).json({ ...site, ...updates });
  }
  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Method not allowed' });
}
