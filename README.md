# HopeBridge

Website for [HopeBridge](https://hopebridgeservices.vercel.app) — a youth-led nonprofit focused on teen mental health support in King County, WA.

**Live site:** [hopebridgeservices.vercel.app](https://hopebridgeservices.vercel.app)

## About

HopeBridge runs school outreach, community events, and peer support programs for teens in King County. I co-founded the organization and built this site from scratch to give us a real online presence and a way to collect and share community stories.

The site includes:
- **Community story submissions** — teens can share their mental health experiences; submissions are stored in Supabase and reviewed before publishing
- **Photo gallery** from past events
- **Partners section** highlighting organizations we’ve worked with
- **Mobile-responsive design** throughout

## Tech stack

| | |
|---|---|
| Frontend | React, Vite |
| Backend/DB | Supabase (Postgres + Storage) |
| Hosting | Vercel |

## Local setup

```bash
git clone https://github.com/anishpentyala/hope-bridge-web
cd hope-bridge-web
npm install
```

Create a `.env` file in the root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these in your Supabase project under **Settings → API**.

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## Deployment

Deployed on Vercel. Any push to `main` triggers a new deploy. Add the same env vars in **Vercel → Project Settings → Environment Variables**.
