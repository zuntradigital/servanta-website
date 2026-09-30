/**
 * Production Node.js server for the Next.js app.
 *
 * This is the file Hostinger's Node.js hosting (Phusion Passenger) runs as the
 * "Application startup file". It boots Next.js in production mode and serves
 * every route, the App Router middleware (locale routing), the `/_next/*`
 * assets, API behaviour, redirects and security headers — exactly what
 * `next start` does, but as a plain startup file Passenger can launch.
 *
 * Passenger provides the port to listen on through `process.env.PORT`; locally
 * you can run `node server.js` (optionally with PORT=xxxx). Run `npm run build`
 * first so the `.next` production build exists.
 */
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS Node startup file (not bundled by Next). */
const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);

// dev:false -> serve the existing production build in .next (never rebuilds here).
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, () => {
      console.log(`> SERVANTA ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
    process.exit(1);
  });
