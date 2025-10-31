
# Civic_Eye

Smart Civic Issue Reporter — frontend (Vite + React/TS) and a small Node mailer backend used to forward complaints to departments.

This README covers local setup, required environment variables, and deployment tips (Vercel).

## Quick start (local)

1. Install dependencies

```powershell
npm install
cd server && npm install
```

2. Create environment variables

- Frontend (root `.env` or Vercel env vars):
	- `VITE_SUPABASE_URL` — your Supabase project URL (example: `https://xyz.supabase.co`)
	- `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY` — Supabase anon/publishable key
	- `VITE_MAILER_URL` — URL of the mailer backend (default: `http://localhost:5000`)

- Backend (`server/.env`):
	- `EMAIL_USER` — SMTP username (e.g., Gmail address or SendGrid user)
	- `EMAIL_PASS` — SMTP password (or app password)
	- `FROM_NAME` — friendly from name for outgoing mail
	- `CC_EMAIL` — default department/CC email
	- `PORT` — backend port (default `5000`)
	- `SUPABASE_URL` — Supabase project URL (server-side copy)
	- `SUPABASE_SERVICE_ROLE` — Supabase service role key (DO NOT expose to client or public repos)

3. Run servers

```powershell
# backend
cd server
node server.js

# frontend (project root)
npm run dev
```

Frontend will be available at `http://localhost:3000` (Vite). Backend default: `http://localhost:5000`.

## Deployment (Vercel)

1. In your Vercel project settings, add the environment variables under Project → Settings → Environment Variables:
	 - `VITE_SUPABASE_URL` = https://<your-project>.supabase.co
	 - `VITE_SUPABASE_PUBLISHABLE_KEY` = <your-supabase-anon-key>
	 - `VITE_MAILER_URL` = https://<your-mailer-endpoint> (if using hosted backend)

2. Only public/publishable keys (anon) should be exposed to the client. Keep the `SUPABASE_SERVICE_ROLE` secret and store it only on the server (do not set it as `VITE_...`).

3. Trigger a redeploy after adding env vars.

If you deploy the backend separately (e.g., to a server or serverless platform), set the `server/.env` values in that host's secret store.

## Testing anonymous submissions

A helper script `scripts/testAnon.js` is included to POST a test anonymous complaint to `server/api/complaints/anonymous`. Run it locally after starting the backend:

```powershell
node scripts/testAnon.js
```

It will print the server response so you can verify insertion and acknowledgement behavior.

## Security and cleanup

- This repository currently contains `.env` files with values. Those are present in the commit history.
	- If these contain real secrets, rotate them immediately (Supabase keys, email passwords).
	- If you want help removing them from history, I can run a history-rewrite (BFG or git filter-repo) — note this rewrites commits and requires force-pushing.

- Add `.gitignore` entries for local `.env` files to avoid future leaks.

## Support

If you want, I can:
- Create a sanitized `server/.env.example` and add a `.gitignore` entry (recommended).
- Help set Vercel environment variables via the Vercel dashboard or CLI.
- Remove secrets from the git history (with guidance and explicit confirmation).

---

Happy to help with any of the above steps; tell me which one you want next.
