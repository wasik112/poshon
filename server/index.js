const express = require('express');
const cors = require('cors');
const siteData = require('./siteData');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/site', (req, res) => {
  res.json(siteData.site);
});

app.get('/api/locations', (req, res) => {
  res.json(siteData.locations);
});

app.put('/api/site', (req, res) => {
  const updates = req.body;
  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({ error: 'Invalid site data payload' });
  }
  Object.assign(siteData.site, updates);
  res.json(siteData.site);
});

app.put('/api/locations', (req, res) => {
  const updates = req.body;
  if (!Array.isArray(updates)) {
    return res.status(400).json({ error: 'Locations must be an array' });
  }
  siteData.locations = updates;
  res.json(siteData.locations);
});

app.listen(PORT, () => {
  console.log(`POSHON backend listening on http://localhost:${PORT}`);
});
