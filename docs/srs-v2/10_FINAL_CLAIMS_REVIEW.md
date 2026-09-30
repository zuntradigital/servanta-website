# 10 — Final Claims Review (WEB-MKT-SRS-002 §1, §71, §94, §142)

Review date: 2026-09-29. Scope: every public page, in English and Arabic.

## Removed or corrected

| Where | Before | After | Rule |
|---|---|---|---|
| Home hero | Photo of a dashboard: "$48,250" revenue, "1,250" customers, "Good Morning, Lewis!" with a face photo, "Projects" module, USD, no label | Illustrative Command Center mockup with a visible "Illustrative" caption and demo data | §12.2, §57, §59, AC-006 |
| Home statistics | "4 · Core Operations", "AR/EN", "24/7 · Operational Visibility" (placeholder values) | Section off (`showContentPlaceholders = false`); "4" and "24/7" deleted | §1.1, §9, AC-016 |
| Platform pillars | "Enterprise-Grade Security" / "أمان بمستوى المؤسسات" | "Role-Based Access Control" | §71 (grade claims) |
| Platform pillars | "Built to Scale" / "مبنية للتوسّع" | "Modular Architecture" / "بنية معيارية" | §1.1 (performance claims) |
| Platform pillars | "one company's data is never visible to another" | "its data kept separate from every other company's" | §46 (undocumented technical claims) |
| Command Center mockup | Alert named "Al Rashid Facilities" / "مؤسسة الراشد للمرافق" (plausibly a real company) | "Northwind Facilities" (the site's standard sample customer) | §57 (no customer data) |
| Home capability grid | "Six connected modules" | Capability map built from the catalog, with no count | §1.3 |

## Checked and clean

- **Certifications:** no SOC 2, ISO 27001, GDPR, PCI, "bank-grade", "military-grade" or "Zero Trust" claims (§71).
- **Numbers:** no uptime, SLA, performance or conversion-rate figures (§1.1, §44, §89).
- **Social proof:** no customer logos (the section is hidden while empty), no testimonials (hidden while empty), no case studies (§9, AC-017).
- **Integrations:** none named (accounting, payment, e-signature, WhatsApp, government, calendar). The Security page doesn't cover the API, which is unpublished (§50–52, AC-018).
- **AI:** no AI, Copilot, AI search, predictive scoring or chatbot claims (§53).
- **Unpublished capabilities:** ROADMAP and DECISION_REQUIRED capabilities (client portal, CRM, pipeline, quotations, workflow engine, compliance, DMS, OCR, profitability, integration hub) appear nowhere public (AC-004). This is covered by `tests/e2e/srs-v2.spec.ts`.
- **E-signature:** multi-party signing, signature evidence and legal clauses are shown only as "Coming soon", with no provider named and no legal-validity claim (§30).
- **Wording rules:** Collections uses the §35 wording ("helps you follow up… organize collection actions"). Audit logs use the §40 wording ("audit layer for sensitive events and changes…"). Search makes no AI, semantic or instant claims (§41).
- **Security page:** covers only documented controls. Retention periods, security testing and API security are explicitly left out until approved (§70).

## Still open (DECISION_REQUIRED)

1. **Capability statuses.** Every `AVAILABLE` status needs Product Owner confirmation against the running platform (see 02_PRODUCT_CAPABILITY_MATRIX.md).
2. **Pricing entitlements vs the Master SRS.** Pricing shows the contract library, custom templates, contract sharing and distribution tracking as included, while the Master SRS lists them as post-MVP. Pricing was not changed.
3. **Solution: Facilities Management.** It isn't one of the §54 solution families, and none of the solutions has a recorded PO approval.
4. **Blog.** The five sample articles and their visible "Sample author — replace before launch" label need real authors or removal.
5. **Illustrative KPI values** (128 / 214 / 37 / SAR 1.2M) in the Command Center mockup: acceptable as labelled demo data under §61, but marketing should approve them.
6. **Hero photo, restored at the client's request (2026-09-29).** `public/hero-background.png` is the homepage hero background again, which replaces the illustrative Command Center there. Its screen still shows "$48,250" revenue, "1,250" customers, a named person with a face photo, USD and a "Projects" menu, with no illustrative label. Under §12.2, §57 and §59 this needs either approved product UI in the image or an illustrative marking before production.
7. **Footer copyright, set to "© 2026 SERVANTA." at the client's request (2026-09-29).** §117 asks for the legal name (Zyntra Digital) in official legal places. The Organization structured data still carries `legalName: Zyntra Digital`. The design/development credit line was removed.
