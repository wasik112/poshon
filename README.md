# POSHON NGO Web App

React + Vite frontend and Node.js + Express backend for **POSHON NGO** — caring for street dogs across Dhaka. The UI is built to match the Tailwag Dog Breeder & Adoption design.

## Structure

```
poshon/
├── client/                   # React + Vite frontend
│   ├── index.html            # Vite entry (loads /src/main.jsx)
│   ├── vite.config.js        # Vite + dev proxy → backend
│   ├── .env / .env.example   # VITE_API_BASE_URL, VITE_API_PROXY_TARGET
│   ├── public/               # Static assets (favicon.svg)
│   ├── design-reference/     # Tailwag WordPress export — design source, NOT shipped
│   └── src/
│       ├── main.jsx
│       ├── App.jsx           # Page composition only
│       ├── services/api.js   # Fetch wrapper for /api endpoints
│       ├── hooks/
│       │   └── useSiteData.js
│       ├── styles/
│       │   └── index.css     # Theme tokens + all component styles
│       └── components/
│           ├── Header.jsx
│           ├── Hero.jsx
│           ├── ServicesStrip.jsx
│           ├── About.jsx
│           ├── CallToAction.jsx
│           ├── Process.jsx
│           ├── Stats.jsx
│           ├── Services.jsx
│           ├── Pets.jsx
│           ├── Locations.jsx
│           ├── Footer.jsx
│           ├── MapModal.jsx
│           ├── AdminPanel.jsx
│           └── LoadingScreen.jsx
└── server/                   # Node.js + Express backend
    ├── index.js              # Express app, GET/PUT /api/site /api/locations
    └── siteData.js           # In-memory content (site config + booth locations)
```

## Local setup

From `c:\Users\jahid\Desktop\poshon`:

1. **Install dependencies**
   ```powershell
   cd server;  npm install
   cd ../client; npm install
   ```

2. **Run the backend** (port 4000)
   ```powershell
   cd server; npm start
   ```

3. **Run the frontend** (port 5173, proxies `/api` → backend)
   ```powershell
   cd client; npm run dev
   ```

Open the URL Vite prints — typically <http://localhost:5173>.

## Environment

`client/.env` controls API wiring:

```ini
VITE_API_BASE_URL=/api               # what the React app fetches
VITE_API_PROXY_TARGET=http://localhost:4000  # where Vite proxies /api in dev
```

For production, set `VITE_API_BASE_URL` to your real backend URL and remove the proxy reliance.

## Features

- **Hero** with primary CTA → opens booth map modal
- **Services strip**, **About**, **CTA banner**, **Adoption process** (3 steps)
- **Stats** band (Happy Dogs, Emergency Services, etc.)
- **Services**, **Featured Pets**, **Booth Locations** sections
- **Footer** with contact, social links, copyright
- **Map modal** — OpenStreetMap embed for each booth
- **Admin panel** — JSON editor that PUTs to `/api/site` and `/api/locations`

## API

| Method | Path             | Body                | Description                |
|--------|------------------|---------------------|----------------------------|
| GET    | `/api/site`      | —                   | Full site content tree     |
| GET    | `/api/locations` | —                   | Array of booth locations   |
| PUT    | `/api/site`      | Site object         | Shallow-merges into store  |
| PUT    | `/api/locations` | Array of locations  | Replaces locations list    |

Data is **in-memory** (`server/siteData.js`) — restarting the server resets edits.

## Design reference

The original Tailwag WordPress export lives in `client/design-reference/tailwag-export/` for design reference only. It is **not** in `public/`, so it isn't bundled into the build.
