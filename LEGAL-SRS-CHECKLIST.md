# Legal & compliance: SRS checklist

This checks the public website against **SRS-SERVANTA-MASTER-001 v1.0** (Master Software Requirements Specification, 107 pages, dated 2026-09-27), one legal-related requirement at a time. It covers the marketing site only.

**The key finding:** the Master SRS has **no legal text**. It has no Privacy Policy, Terms of Service or Cookie Policy wording. It also has no refund, cancellation or subscription terms, no company registration details, and no legal contact. It says so itself:

- **RISK-029** (p. 96): the website's legal pages (privacy, terms, cookies) have a full management mechanism but **zero actual legal text**. Status: Open, legal review, not blocking.
- **BR-WEB-042** (p. 54): the website spec "provides legal-content management capability; it does not author legal content".

So no legal wording was written or invented for this site. The pages stay in their "pending legal review" state until counsel supplies the text.

**Legend**
- ✅ Done: implemented on the website.
- 🔌 Backend: needs the platform, CMS or forms backend. The website is ready for it where it can be.
- ⚠️ Needs decision or input: the SRS doesn't supply it, or legal review is still open.

## Legal pages (RISK-029, BR-WEB-042, BR-WEB-036/037)

| Req | What | Status | Where |
|---|---|---|---|
| RISK-029 | Privacy, Terms and Cookie pages exist, with no invented legal text | ✅ | `/{en,ar}/legal/privacy`, `/legal/terms`, `/legal/cookies` (old URLs redirect 308) → `src/content/pages/legal.ts`, `LegalPage.tsx` |
| RISK-029 | Final legal text | ⚠️ | Must come from legal review. Put it in `legal.ts` and set `lastUpdated`, which replaces the "pending legal review" notice with the date. |
| BR-WEB-042 | The site doesn't author legal content | ✅ | The pages only say the text is being prepared |
| — | The legal pages link to the Contact page | ✅ | The "contact us" line is now a real link to `/{locale}/contact` (it used to be plain text) |
| BR-WEB-036 | Both locales have their own page, so no page is missing in either locale | ✅ | English and Arabic containers |
| BR-WEB-037 | No machine translation | ✅ | Arabic is drafted separately and flagged for native review in `legal.ts` |

## Legal links (footer, cookie banner, forms)

| Where | Links | Status |
|---|---|---|
| Footer "Legal" column, both locales | Privacy, Terms, Cookies, plus a "Cookie settings" button that reopens the consent panel | ✅ `SiteFooter.tsx` |
| Cookie banner | Cookie Policy | ✅ `CookieConsent.tsx` |
| Contact, Request a Demo, Contact Sales and Newsletter forms | Privacy Policy notice under the submit button | ✅ `LeadForm.tsx`, `NewsletterForm.tsx` |
| All of the above | Every legal and contact link returns 200 in `/en` and `/ar` | ✅ Checked on the production build (desktop and 375px mobile, no horizontal overflow) |

## Cookie consent and analytics (RISK-030, BR-WEB-028/029/031)

| Req | What | Status | Where |
|---|---|---|---|
| RISK-030 | Consent mechanism, with analytics **off by default** until the visitor opts in | ✅ | `src/lib/consent.ts`, `CookieConsent.tsx` |
| RISK-030 | Whether the mechanism is enough under Saudi data protection law hasn't been legally reviewed | ⚠️ | No compliance claim is made anywhere on the site. It needs legal review. |
| — | Categories shown: "Strictly necessary" (language, consent record) and "Analytics" | ✅ | These match the cookies the site actually sets (`NEXT_LOCALE`, `servanta_consent`). The SRS lists no other categories, so none were added. |
| BR-WEB-028 | No analytics vendor is named or loaded | ✅ | `src/lib/analytics.ts` has no adapter registered. The CSP allows no third-party script origins. |
| BR-WEB-029 | No "paste a script tag" field | ✅ / 🔌 | The site has no field like this. Structured analytics configuration belongs in the CMS or admin. |
| BR-WEB-031 | `website_form_submissions.ip_address` is stored hashed | 🔌 | Forms backend. The browser never sends an IP field. |
| BR-WEB-024 | Submissions are permanent (spam status only, no hard delete) | 🔌 | Forms backend |

## Consent checkboxes and account flows

| Req | What | Status |
|---|---|---|
| — | Explicit consent checkbox anywhere | ⚠️ **The SRS doesn't require one**, so none was added |
| FR-TENANT-001, FR-PTEAM-002, p. 55 | There is no public sign-up. The Platform Super Admin provisions tenants and users are invited. There is no customer/client login role (OQ-013 closed; Customer Portal is Tranche 2). | ✅ The marketing site has no sign-up or login, so it has no sign-up terms acceptance |
| FR-AUTH-001–006 | Login, password reset and enumeration rules | 🔌 Platform app, not this website |

## Pricing, subscription and payment wording

| Req | What | Status |
|---|---|---|
| DEC-006 | Payment gateway deferred; no card data on platform servers (p. 69) | ✅ No checkout or payment form. Plans are requested through Contact Sales. |
| DEC-012 | Free-trial policy deferred | ✅ No trial is offered |
| DEC-014 / DEC-015 | Price lock on renewal, and downgrade proration, deferred | ✅ No renewal or proration promise. "Can I change plans later?" sends visitors to the team. |
| DEC-007 | Tax/VAT rules deferred, legal review required | ✅ No VAT or tax statement on pricing |
| — | Refund / cancellation policy for the SERVANTA subscription | ⚠️ **No text in any SRS.** WEB-MKT-SRS-002 §7.3 requires a Refund Policy page, so `/legal/refunds-cancellation` (formerly `/refund-policy`, which redirects) now exists as a "pending legal review" placeholder, linked from the footer. No refund terms were written. |
| BR-PRICE-001 | Annual price of at least 600 SAR | ✅ See `PRICING-SRS-CHECKLIST.md` |

## Claims the SRS says must not be made

| Source | Rule | Status |
|---|---|---|
| p. 69 compliance note | No claim of PCI DSS, SOC 2 or ISO 27001 certification. Jurisdiction-specific data protection controls wait for legal verification (DEC-007). | ✅ The whole site was scanned: none found |
| RISK-018, BR-LEGAL-009, DEC-025 | The legal validity of e-signatures and Nafath hasn't been researched | ✅ E-signature appears only as "At launch", with no validity claim |
| OQ-002 | GPS tracking needs legal review | ✅ No GPS or location-tracking claim. `Permissions-Policy` sets `geolocation=()`. |
| p. 70 | Audit-log retention waits for legal verification | ✅ No retention period is stated |
| NFR-AVAIL-001, p. 79 | No uptime, RPO/RTO or SLA figures | ✅ None stated |
| p. 13, DEC-033 | No AI features | ✅ No AI claims |
| p. 72 | WCAG 2.2 AA is a target (Proposed), not a certification | ✅ Not claimed. The skip link and `autocomplete` on personal-data fields, which p. 72 calls for, are in place. |

## Security notices (p. 68)

| Control | Status |
|---|---|
| HSTS, X-Content-Type-Options, X-Frame-Options / CSP `frame-ancestors`, CSP, Referrer-Policy | ✅ `next.config.ts` |

## Information the SRS doesn't provide (needed before launch)

1. The Privacy Policy, Terms of Service and Cookie Policy text (RISK-029).
2. The registered legal entity name. `brand.legalEntityName` is currently "SERVANTA", the product name from DEC-001 and BR-WEB-001. It isn't a registered company name.
3. Legal and privacy contact details: an email address, a postal address, and a data protection contact if one applies. `brand.contact` is empty and nothing is shown.
4. Governing law and jurisdiction. The SRS leaves Egypt vs. the Gulf open (DEC-007, RISK-005, RISK-022).
5. Subscription refund and cancellation terms.
6. Legal review of the cookie mechanism against Saudi data protection law (RISK-030).

## Decisions to confirm (existing site copy the SRS doesn't cover)

- ⚠️ The form notice says "By submitting, you agree to our Privacy Policy", but that policy isn't published yet. The SRS doesn't specify wording, so it was left as is. Consider "See our Privacy Policy" until the text exists.
- ⚠️ The consent record lasts 180 days (`consent.ts`), and the newsletter says "Unsubscribe at any time". These are existing project choices, not SRS requirements. Legal review should confirm them.
- ⚠️ The FAQ and Platform copy ("secure by design", "tenant isolation", "audit log") describe designed capabilities. The SRS (p. 101) says no implementation exists yet and that nothing may be described as tested or verified. The copy makes no test claims, but marketing and legal should confirm the tone before launch.

## Legal Center (MOD-LEGAL-CENTER-AND-PUBLIC-WEBSITE-SRS)

That document also contains **no legal wording**. It defines the Legal Center's structure, catalog, statuses and links, and says every document needs counsel review before it is published. So this was implemented as structure only. Details are in `docs/website/23-WEBSITE-LEGAL-CENTER-SRS.md`.

| Req | What | Status | Where |
|---|---|---|---|
| LEGAL-LC-001 | `/legal` landing page, documents grouped by category | ✅ | `src/app/[locale]/legal/page.tsx` |
| LEGAL-LC-002 | Catalog-driven document pages `/legal/{slug}`, so new documents need no code change | ✅ | `legalCatalog` in `src/content/pages/legal.ts`, `legal/[document]/page.tsx` |
| LEGAL-LC-003 | Each document has its own version, effective date and last-updated date, shown only once it is published | ✅ | `isLegalPublished`, `LegalPage.tsx` |
| LEGAL-LC-004 | Final text of every document | ⚠️ | All documents are `LEGAL_REVIEW`, and each page shows "Final text pending legal review" |
| LEGAL-LC-005 | DPA (authenticated only), Data Retention and Security notices kept off the public site | ✅ | `visibility` in the catalog; those URLs return 404 |
| LEGAL-LC-006 | Legal & privacy request form with the SRS request types | ✅ 🔌 | `/legal/contact`, `formKey="legal_request"`; needs the forms backend |
| LEGAL-LC-007 | Footer links: Legal Center + Privacy, Terms, Cookies, Refund, in the existing Legal column | ✅ | `SiteFooter.tsx` (no new column) |
| LEGAL-LC-008 | Pricing links Subscription Terms and the Contract Library Disclaimer | ✅ | `pricing/page.tsx` |
| LEGAL-LC-009 | Electronic signature (coming soon) links the Electronic Transactions notice | ✅ | `features/page.tsx`, `features/[module]/page.tsx` |
| LEGAL-LC-010 | Platform documents separated from users' own contracts | ✅ | Notice on `/legal` |
| LEGAL-LC-011 | Old legal URLs redirect permanently | ✅ | `src/config/redirects.ts` |
| LEGAL-LC-012 | Sitemap includes the public legal documents | ✅ | `src/app/sitemap.ts` |
| LEGAL-LC-013 | Documents under review not shown publicly (§6 / AC-LC-002) | ⚠️ Decision | They are listed with a "Pending legal review" badge, which matches the site's existing placeholder pattern. The other option is to hide them until they are published. |
| LEGAL-LC-014 | Arabic legal text reviewed natively | ⚠️ | Applies once the final text exists |
