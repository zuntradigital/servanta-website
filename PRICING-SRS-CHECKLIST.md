# Pricing & Plans: SRS checklist

This checks the public website against **SRS-PRICING-PLANS-3-TIER v1.0**, one requirement at a time. It covers the marketing site only. The dashboard and backend are out of scope for this project, so any requirement that depends on them is marked **Backend**, with the integration point it needs.

**Legend**
- ✅ Done: implemented on the website.
- 🔌 Backend: needs the platform API or the dashboard. The website side is ready where it can be.
- ⚠️ Needs decision: the SRS is ambiguous or contradicts itself, so a reading was picked. Please confirm it.

## Plans, prices and features (§2–7, §26)

| Req | What | Status | Where |
|---|---|---|---|
| §2.1 / §2.2 | Three plans: Starter 600, Professional 1,200 and Business 2,400 SAR per year | ✅ | `src/content/pricing.ts` (seed) |
| §2.1 / §9 | Monthly equivalent derived as `annual_price / 12` (50 / 100 / 200). It is display-only and never stored. | ✅ | `monthlyEquivalent()` in `src/lib/pricing-types.ts` |
| §2.1 | Wording "50 SAR per month, billed annually" | ✅ | `src/content/pages/pricing-page.ts` |
| §2.2 | Target audience per plan | ✅ | Shown as the line under each plan name |
| §3–5 | Per-plan features | ✅ | 6 highlights per card, plus the full comparison |
| §3–5 | Limits: users, customers, contracts, work orders per month, branches, storage | ✅ | "Key limits" on each card, plus the limits table |
| §4 / §5 | "Everything in Starter / Professional, plus" | ✅ | `includes_plan` in the plan data |
| §6 | Comparison matrix: all 24 feature rows in SRS order, plus branches, users and storage | ✅ | "Features by plan" and "Limits by plan" tables. On mobile, these become stacked panels. |
| §7 / §26 | Plan messages: "ابدأ بتنظيم أعمالك", "طوّر إدارة أعمالك وعقودك" and "أدر دورة العقود والتشغيل باحترافية متكاملة" | ✅ | `display_description` |
| AC-013 / AC-014 | Unreleased features are never shown as available. E-signature, multi-party signing, legal clauses and advanced reports carry an "At launch" tag, and a footnote explains it. | ✅ | Cards and the comparison table |
| ⚠️ §5 vs §6 | §6 marks Signature Evidence and Contract Finalization for Business as a plain ✓, but §5 lists them under "when the e-signature module launches". They are shown as **At launch**, following AC-014. | ⚠️ | Please confirm |
| ⚠️ §4 | Advanced reports for Professional is "حسب إطلاق الميزة" in the SRS. It is shown verbatim as "Subject to feature launch", not as a ✓. | ⚠️ | Please confirm |

## Pricing page behaviour (§15)

| Req | What | Status | Where |
|---|---|---|---|
| §15 | Each card shows the name, short description, annual price, monthly equivalent, 4–6 top features, key limits and a request button | ✅ | `src/components/pricing/PricingPlans.tsx` |
| §15 | Badge (e.g. "الأكثر استخدامًا") only when the plan data sets it | ✅ | `is_popular` / `is_recommended`. The SRS flags no plan, so no badge shows. Tested with a mock API that sets it. |
| §15 | The user's current plan state | 🔌 | The card supports `currentPlanCode`, which shows a "Current plan" badge and disables the button. It needs a signed-in tenant and `GET /api/v1/tenant/subscription`, and the public site has neither. |
| §15 / AC-007 | Prices and feature names come from the Pricing API, not the Next.js code | ✅ / 🔌 | `src/lib/pricing.ts` calls `GET {PRICING_API_BASE_URL}/api/v1/public/plans`. Until the API exists, a seed file that mirrors the SRS is served through the same code path. No component contains a price or feature name. |
| §20 | `GET /api/v1/public/plans/{code}` | ✅ / 🔌 | `getPublicPlan()`. It checks the plan chosen on the pricing page before preselecting it on the sales form. |
| AC-006 | Only published plans are shown | ✅ | The client also filters out anything not `published` + `public`. Verified with a mock API: draft and private plans were dropped. |
| AC-001 | No public plan below 600 SAR per year | ✅ / 🔌 | Enforcing this at publish time is backend work. The site also refuses to show a plan below the floor (verified with a mock plan at 500). |
| §8.1 | Plans follow `sort_order` | ✅ | Verified with a mock API |
| — | Loading, error and empty states | ✅ | A skeleton while loading. An "unavailable" alert with a Contact button if the API fails (verified). A "no plans published" state with a Talk to Sales button. |
| §15 | Responsive | ✅ | Checked at 1440, 1280, 1024, 820 and 390px in English and Arabic, with no horizontal overflow. Screenshots are in `servanta-website-screenshots/pricing/`. |

## Subscribing (§16, §28)

| Req | What | Status | Where |
|---|---|---|---|
| §16 | No payment gateway or self-service checkout | ✅ | Nothing added |
| §15 | Subscribe / request plan button | ✅ | "Request this plan" opens Contact Sales with the plan preselected (`/request-demo?type=sales&plan=business`). The form's plan list comes from the API. |
| §9 / §28 | A separate monthly subscription is its own business decision | ✅ | Annual only, with no monthly/annual toggle. The data type has `monthly_price`, ready if one is approved. |
| §19 | No discount engine | ✅ | Nothing added |

## Platform and backend requirements (outside this website)

| Req | What | Status |
|---|---|---|
| §8.2 / §18 / AC-002 / AC-003 | PlanVersion is immutable once published, and a price change creates a new version | 🔌 The contract type carries `version` and `effective_date`. Storage and rules are backend. |
| §10 / AC-010 / AC-011 | A subscription is tied to its PlanVersion, and archiving a plan doesn't affect existing subscribers | 🔌 Backend |
| §11 / §12 / AC-004 / AC-005 | Server-side entitlement and limit enforcement (`403 feature_not_entitled`, `limit_reached`) | 🔌 Backend |
| §13 / §14 / §25 / AC-009 | Upgrade, downgrade with a usage check, and an auditable change request (`POST /api/v1/tenant/subscription/change-request`) | 🔌 Dashboard + backend |
| §17 | Subscription invoices | 🔌 Backend |
| §21 | Audit events (PlanCreated … EntitlementChanged) | 🔌 Backend |
| §22 / AC-008 | "My Subscription" page: current plan, period, usage, invoices, upgrade and downgrade buttons | 🔌 Dashboard (excluded from this project) |
| §23 / §24 / AC-012 | Subscription notifications and 80/90/100% usage alerts | 🔌 Dashboard + backend |
| §2.2 note | Admin editing of plans and prices | 🔌 Admin panel + backend |

## To switch to the live API

Set `PRICING_API_BASE_URL` (see `.env.example`). The response must match `src/lib/pricing-types.ts`, with text in the language sent in `Accept-Language`. The page revalidates every 5 minutes.
