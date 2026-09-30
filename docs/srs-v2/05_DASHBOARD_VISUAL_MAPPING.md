# 05 — Dashboard Visual Mapping (WEB-MKT-SRS-002 §12, §97, §98, §133)

All dashboard visuals on the website are **illustrative marketing mockups** (`data-visual-type="illustrative"`, with a visible "Illustrative product visualization" caption). None of them is a screenshot. Every figure is fictional demo data, and every record name is a sample (Northwind Facilities, CON-1042, WO-3318, INV-2207). This table is not a claim about a data source. Per §97, each element names the documented platform source that a real widget must come from.

## Command Center visual (homepage hero; `/features/command-center`)

Component: `src/components/visuals/CommandCenterVisual.tsx`. Content: `src/content/home.ts` (`hero.visual`).

| Widget | Metric shown (demo) | Product source (documented) | Module | Permission | Tenant scope | Website usage | Status |
|---|---|---|---|---|---|---|---|
| KPI: Customers | 128 | Customer records (FR-CUST-001) | Customer Management | customer view | tenant | Illustrative KPI tile | Verify with PO |
| KPI: Contracts | 214 | Contract records (FR-CONTRACT-001) | Contract Management | contract view | tenant | Illustrative KPI tile | Verify with PO |
| KPI: Work Orders | 37 | Work orders (FR-WO-001) | Work Orders | work order view | tenant, branch | Illustrative KPI tile | Verify with PO |
| KPI: Revenue | SAR 1.2M | Billing / payments. Financial KPI, financial.view only (BR-CMDCTR-001) | Billing, Payments | financial.view | tenant | Illustrative only; "visual only if available" (§97) | Verify: financial KPI definitions are needed (BR-CMDCTR-002) |
| Trend: Invoiced vs collected | Relative bars, no figures | Invoices and payments (FR-BILL, FR-PAY) | Billing, Payments | financial.view | tenant | Illustrative trend | Verify |
| Attention: overdue invoice | "Overdue Invoice — Northwind Facilities" | InvoiceOverdue → Attention Required (FR-CMDCTR-003) | Command Center, Collections | financial.view | tenant | Attention item | Documented |
| Attention: contract expiring | "Contract Expiring — 12 days" | ContractRenewalDue (FR-CONTRACT-007) | Command Center, Contracts | contract view | tenant | Attention item | Documented; renewal threshold is Proposed (OQ-007) |
| Attention: work order awaiting verification | "WO-3318, Today" | Pending approvals / verification (FR-CMDCTR-003, BR-WO-002) | Command Center, Work Orders | work order verify | tenant, branch | Attention item | Documented |

## Dashboard questions (homepage section; `/features/command-center#dashboard`)

Content: `dashboardQuestions` in `src/content/catalog.ts`. These are text answers, not metrics.

| Question (§12.1) | Answered by | Source | Status |
|---|---|---|---|
| What needs attention now? | Attention list | FR-CMDCTR-003 | Documented |
| What is overdue? | Overdue invoices, delayed services | FR-CMDCTR-003 | Documented |
| What is coming up? | Contracts approaching end date | FR-CMDCTR-003, FR-CONTRACT-007 | Documented |
| What is the workload? | Unassigned work orders, pending approvals | FR-CMDCTR-003 | Documented |
| How are customers doing? | Customer 360 (not a health score) | FR-CUST-007 | Documented. Client Health Score is not documented and not shown (§14) |
| Revenue and collections? | Financial indicators, financial.view only | BR-CMDCTR-001 | Documented |

## Items from SRS §13 / §97 NOT shown

| Element | Reason |
|---|---|
| SLA breaches | Not in the Master SRS Command Center scope |
| Missing evidence | Not a documented Command Center item |
| Compliance "Due" | Compliance / tax due dates are DECISION_REQUIRED |
| Customer Health | Not documented |

## Other illustrative visuals

`src/components/visuals/UiCrops.tsx` (customer, contract, service, schedule, work order, evidence, verification, invoice, payment, collections, reports, notifications, audit log, search, architecture) and `FlowVisual.tsx` (About page). All are illustrative, all use the same fictional demo records, and none shows personal data.

The homepage hero **photo** (`public/hero-background.png`) is switched off in `src/config/hero.ts`. Its screen read as a real screenshot and showed invented figures ($48,250, 1,250 customers), a named person with a face photo, USD, and a "Projects" module the product doesn't have.
