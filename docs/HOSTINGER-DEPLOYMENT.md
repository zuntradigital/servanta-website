# Deploying to Hostinger (Node.js / Next.js server)

The site runs as a **Next.js Node.js server** on Hostinger's **Node.js hosting**
(Phusion Passenger). This keeps the site 100% identical — server rendering, the
locale middleware, `/_next/*` assets, redirects, security headers, API behaviour,
Arabic RTL — nothing about the UI or content changes.

## Why the 403 happened

The build was uploaded as if it were static files. A Next.js *server* build has no
`index.html` to serve, so the document root looked empty and the host returned
**403 Forbidden**. The fix is not to serve files — it is to **run the app as a
Node.js process**, which is what this setup does.

## What runs the app

`server.js` (project root) is the Passenger **startup file**. It boots Next in
production and serves everything on the port Passenger provides. It is the same
as `next start`, just as a launchable file.

## A. Commands to run locally (verify before uploading)

```bash
npm install
npm run build          # production server build (.next)
npm start              # = next start  → http://localhost:3000
# or exactly what Hostinger runs:
node server.js         # → http://localhost:3000  (PORT overridable)
```

## B. What to upload to Hostinger

Upload the **whole project** (not `out/`, not `.next` alone). Two ways:

- **Git (recommended):** push the repo, then on the server run `npm install` and
  `npm run build`.
- **File Manager / SFTP:** upload everything **except** `node_modules/`, `.next/`,
  `out/`, `test-results/`, `.git/`. Then install and build on the server.

Required files/folders in the upload: `server.js`, `package.json`,
`package-lock.json`, `next.config.ts`, `tsconfig.json`, `next-env.d.ts`,
`src/`, `public/`, `.env.production` (optional, see E).

## C. Hostinger Node.js app settings (hPanel → Advanced → Node.js)

| Setting | Value |
|---|---|
| **Node.js version** | 20 or 22 (Next 16 needs Node ≥ 20.9) |
| **Application root** | the folder you uploaded, e.g. `domains/yourdomain.com/servanta` |
| **Application URL** | your domain (e.g. `yourdomain.com`) |
| **Application startup file** | `server.js` |
| **Build command** (if prompted) | `npm run build` |
| **Start / run command** | Passenger uses the startup file; `npm start` also works |

Setup order in hPanel: **Create the Node.js app** (set the four fields above) →
**Run NPM Install** → run the **build** (`npm run build` via the app's terminal
or SSH) → **Restart** the app. hPanel writes the Passenger `.htaccess` itself —
do not add your own.

## D. Environment variables (hPanel → the Node app → Environment variables, or `.env.production`)

| Variable | Needed? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Canonical links, hreflang, sitemap, OG URLs. Set to `https://yourdomain.com`. |
| `NODE_ENV` | Auto | Passenger sets `production`. |
| `PORT` | Auto | Passenger sets it; `server.js` reads it. |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | Optional | Where Contact/Demo/Sales/Newsletter POST. Unset ⇒ forms show "not connected". |
| `PRICING_API_BASE_URL` | Optional | Pricing API base. Unset ⇒ built-in seed. |

Set `NEXT_PUBLIC_*` values **before** `npm run build` (they are inlined at build
time). Change one ⇒ rebuild and restart.

## E. Final folder structure on Hostinger

```
<application root>/            ← Application root in hPanel
  server.js                    ← startup file
  package.json  package-lock.json
  next.config.ts  tsconfig.json  next-env.d.ts
  src/                         ← app source
  public/                      ← static assets (images, fonts source, favicons)
  .next/                       ← created by `npm run build` on the server
  node_modules/                ← created by `npm install` on the server
  .env.production              ← optional env values
```

The domain's web root points at this app through Passenger (hPanel handles the
`.htaccess`), so visiting the domain runs `server.js`.

## F. Steps to verify the deployment

1. In the Node app terminal/SSH: `node -v` (≥ 20.9), `npm install`, `npm run build`
   (must finish with no error), then Restart.
2. Open `https://yourdomain.com/` → redirects to `/en` and renders.
3. Check `https://yourdomain.com/en`, `/ar` (RTL), `/en/pricing`, `/en/features/contracts`,
   `/en/legal/privacy`, `/en/blog`, a blog post, `/en/contact-sales`.
4. Refresh directly on a nested route (e.g. `/ar/legal/privacy`) — must load, not 404.
5. Confirm CSS/JS/fonts/images load (styled page, logo visible) — `/_next/*` served.
6. Check the app log in hPanel for `> SERVANTA ready on …`.

## G. Remaining risks / things to check

- **Plan support:** the domain must be attached to a **Node.js** application in
  hPanel. If you only see a static File Manager, enable the Node.js app first.
- **Build on the server:** `npm run build` needs enough memory; if it fails, build
  locally and upload the `.next/` folder too (with `node_modules` installed on the
  server for the same platform).
- **`.htaccess`:** let hPanel manage it. A leftover static-export `.htaccess` in the
  web root will conflict — remove any old one.
- **Node version:** must be ≥ 20.9. On 18 the build/run will fail.
- **Restart after every rebuild** so Passenger reloads the new `.next`.
