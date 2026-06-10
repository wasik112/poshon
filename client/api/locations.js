import { locations } from './_data.js';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(locations);
  }
  if (req.method === 'PUT') {
    // See note in site.js — Vercel functions are stateless.
    const updates = Array.isArray(req.body) ? req.body : [];
    return res.status(200).json(updates);
  }
  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Method not allowed' });
}
