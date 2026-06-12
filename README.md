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
- **Accounts** — Firebase Auth login/registration for volunteers & activists
- **Admin panel** — admin-only JSON editor that saves site content to Firestore

## Accounts & roles

Authentication is Firebase Auth (email/password). Every user has a Firestore
profile at `users/{uid}` with a `role`:

| Role | Created by | Can |
|------|------------|-----|
| `volunteer` / `activist` | Public **/register** page (user picks the role) | Log in, view **/account** |
| `admin` | Seed script or an existing admin (Dashboard → Admins) | Open **/admin**, edit all site content, create other admins |

Public visitors register at **/register** and log in at **/login**; the header
shows their name + **Log out** when signed in. `admin` can **never** be
self-assigned — Firestore rules enforce that ([`firestore.rules`](firestore.rules)).

## Admin dashboard (`/admin`)

Admins get a full back-office at **`/admin`** — a sidebar dashboard (separate
from the public site) to manage everything: site content, booth locations,
volunteers, activists, blog, team, and other admins. All edits are held as a
draft and written to a single Firestore document `content/main` with one **Save
changes** button. The public site reads from that document, falling back to the
bundled `/api` data when Firestore is empty or unreachable.

When signed in as an admin, a **Dashboard** link appears in the header.

### One-time setup

1. Fill in `client/.env` with your `VITE_FIREBASE_*` values.
2. Firebase Console → **Authentication → Sign-in method** → enable **Email/Password**.
3. Firebase Console → **Firestore Database** → **Create database** (start in
   **test mode** so the seed can write).
4. **Seed the first admin** — from `client/`:
   ```powershell
   npm run seed:admin
   ```
   This creates the demo admin and marks it admin. Default credentials:

   | Email | Password |
   |-------|----------|
   | `admin@poshon.org` | `Poshon@2026` |

   Override with env vars: `ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run seed:admin`.
5. **Lock down** — publish the rules in [`firestore.rules`](firestore.rules)
   (Firestore → Rules → paste → Publish). After this, only existing admins can
   grant the admin role.

Then open **`/admin`**, log in with the seeded credentials, and manage your site.
Create more admins from **Dashboard → Admins** (no need to touch the Console
again — it uses a throwaway secondary Firebase app so you stay signed in).

> ⚠️ Run the seed **before** publishing the strict rules — the very first admin
> must be written while Firestore is still in test mode.

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
