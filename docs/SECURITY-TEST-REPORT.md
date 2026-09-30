# Security Testing Report — SERVANTA Marketing Website

**Report against:** `SENDA-SEC-TEST-PLAN-001` v1.0 (SENDA.BUSINESS Security Testing Execution Plan)
**Target actually assessed:** SERVANTA marketing website (`servanta-website`, this repository)
**Date/time:** 2026-09-29
**Assessor:** Automated defensive review (Claude Code), non-destructive
**Environment:** Local production build (`next build` + `next start`), commit working tree

---

## 0. Important scoping note — read first

The supplied plan (`SENDA-SEC-TEST-PLAN-001`) is written for **SENDA.BUSINESS**, a
multi-tenant SaaS application with authentication, an API, an admin panel,
subscriptions, company subdomains, file uploads, reviews and verification
workflows.

**This repository is a different product**: the **SERVANTA marketing website** — a
statically-rendered Next.js 16 site. Verified facts about this codebase:

- **No API routes** (`app/**/route.ts`): none.
- **No server actions** (`"use server"`): none.
- **No authentication, sessions, JWT, users, or roles.**
- **No database, no ORM, no object storage.**
- **No multi-tenant model, no company subdomains.**
- **No admin panel, no CMS, no file uploads, no subscription/billing engine.**
- **No middleware.**
- Runtime dependencies (5): `next`, `react`, `react-dom`, `lucide-react`, `server-only`.

In addition, **the plan's environment section (§5) was left blank** — no Application
URL, API URL, admin URL, test accounts (ACC-001…009) or testing window were
provided, and no authorization for a live/production target was given.

**Consequences:**

1. The large majority of the plan's ~250 test cases (all of AUTH, RBAC, TENANT,
   IDOR/BOLA, most API, Injection, CSRF, SSRF, File Upload, Subdomain, Business
   Logic, Claim, Verification, Review, Admin, CMS, Token, Rate Limit, Abuse,
   Race, Backup, CI/CD, infra configuration) exercise functionality that **does
   not exist in this codebase**. They are recorded as **NOT APPLICABLE**, not as
   passes — an absent feature is not a tested-secure feature.
2. **No active/offensive testing was performed** (no brute force, credential
   stuffing, injection payloads, IDOR, privilege escalation, or scanning against
   any live host). There was no authorized target, and running such tests against
   a production or third-party system would be unauthorized. This is consistent
   with the plan's own §51 ("SHALL NOT treat this document as permission to
   perform uncontrolled offensive activity") and §53 (Identify → Validate →
   Explain → Recommend).
3. What **was** executed is a **safe, non-destructive, defensive review of this
   repository and its local production build** — the part that is legitimately in
   scope and does not touch anyone's live systems.

No vulnerability is invented because a test could not be run.

---

## 1. Executive summary

Within the applicable scope (a static marketing site and its build output), the
site's security posture is **strong**:

- **0 dependency vulnerabilities** (`npm audit`, prod and full).
- **Comprehensive security headers** verified on live responses (CSP,
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy`, and HSTS in production).
- **No hardcoded secrets** in source, config, or client bundles.
- **No browser source maps** shipped in the production build.
- **No unsafe DOM sinks** except one correctly-escaped JSON-LD block.
- **No open redirect** — all redirect destinations are static internal paths.
- **No sensitive data** in cookies or browser storage.

Findings: **0 Critical, 0 High, 0 Medium, 0 Low, 2 Informational.**

**Final decision for the applicable scope: SECURITY APPROVED (with conditions)** —
the conditions being that the SENDA.BUSINESS application-tier and infrastructure
tests still require a separate, authorized engagement against the actual SENDA
backend, which is not part of this repository.

---

## 2. Methodology

Read-only, non-destructive techniques against the repository and a local
production build (`next build` && `next start`):

- Architecture mapping (routes, actions, deps, middleware).
- `npm audit` (dependency vulnerabilities).
- Secret scanning (source, config, `.env*`, client bundles).
- Static review of DOM sinks (`dangerouslySetInnerHTML`, `eval`, `innerHTML`).
- CSP / security-header review in `next.config.ts` **and** verification on live
  HTTP responses via `curl -I`.
- Source-map exposure check (`.next/static`).
- Redirect-rule review for open-redirect (`src/config/redirects.ts`).
- Client-storage review (`localStorage`, `sessionStorage`, cookies).
- Error-handling check (404 response).

---

## 3. Security gap analysis (plan §52)

1. **Existing security controls (this repo):** strict CSP with `frame-ancestors
   'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`;
   `X-Frame-Options: DENY`; `nosniff`; `Referrer-Policy`; `Permissions-Policy`
   locking camera/mic/geo/payment/usb; COOP `same-origin`; HSTS (prod);
   `poweredByHeader: false`; React's automatic output encoding; JSON-LD escaped;
   forms restricted to a CSP-allow-listed endpoint; no secrets in the bundle.
2. **Missing controls (this repo):** CSP relies on `script-src 'unsafe-inline'`
   (see FIND-001). No SRI on Next's own chunks (not user-configurable for Next's
   runtime; low value on a same-origin static site).
3. **Vulnerable areas:** none identified in this codebase.
4. **Unverified areas:** the entire SENDA.BUSINESS application backend and
   infrastructure — out of this repository and unauthorized/unscoped here.
5–14. **Auth / authz / tenant / API / file / business-logic / subdomain / SEO /
    infra / dependency findings:** none applicable to this repo (features absent);
    dependencies clean.
15. **Test coverage gaps:** application-tier and infra suites cannot be run here;
    they need the live SENDA environment and a rules-of-engagement authorization.
16. **Recommended security tests:** run the AUTH/RBAC/TENANT/IDOR/API/file/
    business-logic suites against the actual SENDA.BUSINESS staging backend under
    an authorized engagement with the ACC-001…009 identities.
17. **P0 risks (this repo):** none.
18. **P1 risks (this repo):** none.
19. **P2 risks (this repo):** CSP inline-script hardening (FIND-001).
20. **Required decisions:** (a) confirm whether SENDA.BUSINESS is a separate
    codebase/engagement; (b) provide an authorized target, scope and test
    accounts if the application/infra tiers are to be tested.

---

## 4. Test coverage & results

### 4.1 Executed against this repository (real evidence)

| Plan ref | Test | Status | Evidence |
|---|---|---|---|
| SEC-HEAD-001 | HSTS | **PASS** | `Strict-Transport-Security: max-age=63072000; includeSubDomains` on prod response; correctly omitted on dev/localhost |
| SEC-HEAD-002 | CSP present & restrictive | **PASS** | `default-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'` (see FIND-001 re inline scripts) |
| SEC-HEAD-003 | Frame protection | **PASS** | `X-Frame-Options: DENY` + `frame-ancestors 'none'` |
| SEC-HEAD-004 | MIME sniffing | **PASS** | `X-Content-Type-Options: nosniff` |
| SEC-HEAD-005 | Referrer policy | **PASS** | `Referrer-Policy: strict-origin-when-cross-origin` |
| SEC-DATA-002 | Error disclosure | **PASS** | `/en/<random>` → HTTP 404, Next default error page, no stack trace |
| SEC-DATA-003 | Source-map exposure | **PASS** | 0 `.map` files under `.next/static`; `productionBrowserSourceMaps` not enabled |
| SEC-DATA-005 | Config exposure | **PASS** | No config endpoints; `.env*.local` git-ignored; `.env.example` holds placeholders only |
| SEC-CLIENT-001/002/005 | Storage secrets | **PASS** | Only locale cookie, banner flag, random analytics IDs, consent choice — no secrets/PII |
| SEC-CLIENT-004 | JS bundle secrets | **PASS** | Secret scan of source + bundles: none |
| SEC-SECRET-001/004 | API keys in repo/bundle | **PASS** | None found |
| SEC-DEP-001/002/003 | Dependency inventory & known vulns | **PASS** | 5 runtime deps; `npm audit` = 0 vulnerabilities |
| SEC-XSS-009 | DOM XSS surface | **PASS** | Only sink is JSON-LD, escaped via `.replace(/</g, "\\u003c")`; React auto-encodes elsewhere; no `eval`/`innerHTML`/`document.write` |
| SEC-SEO-009 | Open redirect | **PASS** | Redirect destinations are static internal locale paths; no user-controlled target |
| SEC-TLS-001 | HTTPS enforcement | **PASS (config)** | HSTS set for production; actual TLS termination is a deployment/edge concern |
| SEC-API-001 | API inventory / debug endpoints | **PASS (N/A surface)** | No API/debug routes exist to expose |
| SEC-POWERED (hardening) | Tech-stack header leak | **PASS** | `poweredByHeader: false`; no `Server`/`X-Powered-By` in responses |

### 4.2 Not applicable — feature absent from this codebase

Recorded **NOT APPLICABLE** (the feature does not exist here; this is not a pass):

Authentication (SEC-AUTH-001…013), Authorization/RBAC (SEC-RBAC-001…006),
Multi-tenant (SEC-TENANT-001…010), IDOR/BOLA (SEC-IDOR-001…010), most API
(SEC-API-002…010), Injection (SEC-INJ-001…006), Reflected/Stored XSS
(SEC-XSS-001…008), CSRF (SEC-CSRF-001…007), SSRF (SEC-SSRF-001…005), File Upload
(SEC-UPLOAD-001…011), Subdomain (SEC-SUB-001…010), most SEO (SEC-SEO-001…008,
010), Business Logic (SEC-BIZ-001…010), Company Claim (SEC-CLAIM-001…004),
Verification (SEC-VER-001…004), Review (SEC-REV-001…006), Admin (SEC-ADMIN-001…007),
CMS (SEC-CMS-001…006), Token/JWT (SEC-TOKEN-001…005), Rate Limiting
(SEC-RATE-001…009), Abuse (SEC-ABUSE-001…005), Race (SEC-RACE-001…006), File
Authorization (SEC-FILE-001…005), Logging/Audit (SEC-LOG-001…009).

### 4.3 Not tested / blocked

Recorded **NOT TESTED (BLOCKED)** — require the live SENDA backend/infra and an
authorized, scoped engagement not available in this repository:

- SEC-TLS-002/003/004 (certificate, protocol versions, mixed content on the
  deployed host).
- SEC-DATA-004 (backup exposure on hosting).
- SEC-DEP-004/005, SEC-SECRET-002/003/005 (backend deps, DB creds, CI/CD, logs).
- SEC-CICD-001…005, SEC-BACKUP-001…004, SEC-CONFIG-001…006 (infra, cloud, WAF/CDN,
  DB, object storage).
- Attack-chain testing (§41), retest (§47) — nothing exploitable to chain or retest.

---

## 5. Findings

### FIND-001 — CSP allows `script-src 'unsafe-inline'`
- **Severity:** Informational
- **CWE:** CWE-1021 (weakened CSP) — informational in this context
- **Affected area:** `next.config.ts` → `Content-Security-Policy`
- **Description:** Because pages are statically generated, the CSP allows
  `'unsafe-inline'` for scripts so Next's inline bootstrap can run without a
  per-request nonce. This is a common, documented trade-off for SSG Next sites and
  is already noted in the config comments.
- **Evidence:** `script-src 'self' 'unsafe-inline'` in the live response header.
- **Impact:** Slightly weakens the XSS mitigation value of CSP. Residual risk is
  low here: there is no server-side user input rendered into pages, and the only
  HTML sink (JSON-LD) is escaped, so there is no known injection vector to exploit.
- **Remediation (optional):** If moving any route to dynamic rendering, adopt
  nonce- or hash-based `script-src` and drop `'unsafe-inline'`. Not required for
  the current static site.
- **Status:** Open (accepted trade-off).

### FIND-002 — HSTS without `preload`
- **Severity:** Informational
- **Affected area:** `next.config.ts` → `Strict-Transport-Security`
- **Description:** HSTS is set with a 2-year max-age and `includeSubDomains` but
  without `preload` / HSTS preload-list registration.
- **Impact:** First-visit-over-HTTP window on a brand-new client remains until the
  header is seen once. Minor.
- **Remediation (optional):** Add `; preload` and submit the domain to
  hstspreload.org once the team is certain all subdomains are HTTPS-only.
- **Status:** Open (optional hardening).

---

## 6. Passed / Failed / Not-tested summary

- **Passed:** all applicable checks in §4.1 (headers, data exposure, source maps,
  secrets, dependencies, DOM/XSS surface, open redirect, client storage, error
  handling, tech-stack leak).
- **Failed:** none.
- **Not applicable:** application-tier suites in §4.2 (features absent).
- **Not tested / blocked:** live-backend and infrastructure suites in §4.3
  (no authorized target/scope).

## 7. Remediation priorities

- **Critical:** none.
- **High:** none.
- **Medium:** none.
- **Low / optional:** FIND-001 (CSP inline-script hardening if any route becomes
  dynamic), FIND-002 (HSTS preload).

## 8. Metrics (applicable scope)

| Metric | Value |
|---|---|
| Applicable tests executed | 17 groups (see §4.1) |
| Passed | all executed |
| Failed | 0 |
| Not applicable (feature absent) | ~200 cases |
| Blocked (needs live SENDA backend/infra) | remaining infra/app cases |
| Critical / High / Medium / Low findings | 0 / 0 / 0 / 0 |
| Informational findings | 2 |
| Dependency vulnerabilities | 0 |

## 9. Final security decision

**For the SERVANTA marketing website (this repository): SECURITY APPROVED WITH
CONDITIONS.** No exploitable weakness was found in the applicable scope. Two
optional informational hardening items remain.

**The SENDA.BUSINESS application and infrastructure tiers are NOT covered by this
report.** Testing them requires their own codebase/environment, an authorized
target and rules of engagement, and the ACC-001…009 test identities. That is a
separate engagement and must not be assumed complete on the basis of this
static-site review.

## 10. What could not be verified, and why

- Anything requiring a running SENDA backend (auth, tenants, API, admin, uploads,
  billing) — that backend is not in this repository, and no authorized live
  target or credentials were provided.
- Deployed TLS/cert/WAF/CDN/cloud/DB/backup/CI-CD posture — infrastructure, not
  code, and out of scope here.
- Active exploitation / attack-chaining — deliberately not performed; there is no
  authorized target and no in-scope vulnerability to exploit.
