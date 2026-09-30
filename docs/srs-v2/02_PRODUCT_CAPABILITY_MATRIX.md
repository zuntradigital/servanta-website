# 02 — Product Capability Matrix (WEB-MKT-SRS-002 §5, §96, §133)

**Authoritative source:** `src/content/catalog.ts`. This table was generated from it on 2026-09-29; regenerate it whenever a status changes. The website renders only `AVAILABLE` and `COMING_SOON` items. Everything else stays internal, with the reason listed.

**Status verification: DECISION_REQUIRED.** The statuses below come from the documents, not from the running product:
- `AVAILABLE` means the capability is in the approved MVP scope of SRS-SERVANTA-MASTER-001 (DEC-004) and, where priced, is included in the pricing entitlements.
- `COMING_SOON` means the pricing source marks it "at launch".

The Master SRS's own implementation-readiness section (§44) records no implemented code as of 2026-09-27. The Product Owner must confirm every `AVAILABLE` status against the running platform before production (§1.2, §136 "Feature statuses verified").

Totals: 61 capabilities. 26 AVAILABLE, 5 COMING_SOON, 13 ROADMAP, 15 DECISION_REQUIRED, 1 INTERNAL, 1 NOT_PUBLISHED.

| # | SRS §5 group | Capability | Status | On the website | Source | Reason if not published |
|---|---|---|---|---|---|---|
| 1 | Customer | Customer management | AVAILABLE | /features/customer-management | SRS-SERVANTA-MASTER-001 v1.0 FR-CUST-001–006 |  |
| 2 | Customer | Customer 360 | AVAILABLE | /features/customer-management#customer-360 | SRS-SERVANTA-MASTER-001 v1.0 FR-CUST-007 |  |
| 3 | Customer | Contacts and sites | AVAILABLE | /features/customer-management | SRS-SERVANTA-MASTER-001 v1.0 FR-CUST-005–006 |  |
| 4 | Customer | Companies / legal entities | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §16 only | Not in the Master SRS module scope; needs Product Owner confirmation. |
| 5 | Customer | Requests | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §5 only | Not documented in the Master SRS. |
| 6 | Customer | Client portal | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §6 Tranche 2, OQ-013 | Roadmap (Tranche 2); no approval to publish. |
| 7 | Customer | Communication | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §5 only | Not documented; WhatsApp/SMS channels are deferred (DEC-006). |
| 8 | CRM | Advanced CRM | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §8.29 (Tranche 1, specified, not implemented) | Specified but not implemented; no approval to publish. |
| 9 | CRM | Sales pipeline | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §8.30 | Specified but not implemented. |
| 10 | CRM | Quotations & proposals | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §8.31 | Specified but not implemented. |
| 11 | Contracts | Contract management | AVAILABLE | /features/contracts | SRS-SERVANTA-MASTER-001 v1.0 FR-CONTRACT-001–006 |  |
| 12 | Contracts | Contract types | AVAILABLE | /features/contracts | SRS-SERVANTA-MASTER-001 v1.0 FR-CONTRACT-001 |  |
| 13 | Contracts | Renewals | AVAILABLE | /features/contracts | SRS-SERVANTA-MASTER-001 v1.0 FR-CONTRACT-007–008; SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts) contract_renewals |  |
| 14 | Contracts | Legal clauses | COMING_SOON | /features/contracts#coming-soon | SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts): legal_clauses "at launch" |  |
| 15 | Contracts | Electronic signature | COMING_SOON | /features/contracts#coming-soon | SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts): "at launch"; SRS-SERVANTA-MASTER-001 v1.0 §8.27 (Post-MVP) |  |
| 16 | Contracts | Multi-party signing | COMING_SOON | /features/contracts#coming-soon | SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts): "at launch"; SRS-SERVANTA-MASTER-001 v1.0 §8.27 (Post-MVP) |  |
| 17 | Contracts | Signature evidence and contract finalization | COMING_SOON | /features/contracts#coming-soon | SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts): "at launch"; SRS-SERVANTA-MASTER-001 v1.0 §8.27 (Post-MVP) |  |
| 18 | Contracts | Contract templates / library | DECISION_REQUIRED | Not shown | SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts) (available) vs SRS-SERVANTA-MASTER-001 v1.0 §8.24/§8.28 (Post-MVP, not implemented) | Sources conflict; shown on Pricing only until the Product Owner decides. |
| 19 | Contracts | Contract versions | DECISION_REQUIRED | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §8.25 (Post-MVP) | Post-MVP document versioning; not confirmed. |
| 20 | Contracts | Obligations | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §5 only | Not documented in the Master SRS. |
| 21 | Contracts | Document generation | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §8.25 (Phase 2) | Phase 2. |
| 22 | Contracts | Secure sharing | DECISION_REQUIRED | Not shown | SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts) contract_sharing (available) vs SRS-SERVANTA-MASTER-001 v1.0 §8.26 (Phase 2) | Sources conflict; shown on Pricing only until the Product Owner decides. |
| 23 | Contracts | Distribution tracking | DECISION_REQUIRED | Not shown | SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts) distribution_tracking (available) vs SRS-SERVANTA-MASTER-001 v1.0 §8.26 (Phase 2) | Sources conflict; shown on Pricing only until the Product Owner decides. |
| 24 | Services | Service management | AVAILABLE | /features/scheduling | SRS-SERVANTA-MASTER-001 v1.0 FR-SERVICE-001–004 |  |
| 25 | Services | Service catalog (workflow, SLA, required documents) | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §17 only | The documented service definition has no workflow or required-documents model. |
| 26 | Operations | Scheduling | AVAILABLE | /features/scheduling | SRS-SERVANTA-MASTER-001 v1.0 FR-SCHED-001–006 |  |
| 27 | Operations | Work orders | AVAILABLE | /features/work-orders | SRS-SERVANTA-MASTER-001 v1.0 FR-WO-001–007 |  |
| 28 | Operations | Field operations | AVAILABLE | /features/work-orders | SRS-SERVANTA-MASTER-001 v1.0 FR-FIELD-001–006 (GPS excluded, OQ-002) |  |
| 29 | Documents | Execution evidence | AVAILABLE | /features/work-orders | SRS-SERVANTA-MASTER-001 v1.0 FR-FIELD-004, BR-FIELD-002 |  |
| 30 | Operations | Workflow engine | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §19 only | Not documented in the Master SRS (fixed state machines only). |
| 31 | Operations | Work templates | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §20 only | Not documented; §20 forbids showing templates that aren't AVAILABLE. |
| 32 | Compliance | Tax / compliance due dates | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §24 only | Not documented in the Master SRS; tax rules are deferred (DEC-007). |
| 33 | Compliance | Compliance calendar / center | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §25 only | Not documented in the Master SRS. |
| 34 | Compliance | Compliance evidence and escalation | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §24 only | Not documented; work-order evidence is published separately. |
| 35 | Documents | Document management | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §6 Phase 2 (Documents) | Phase 2. |
| 36 | Documents | Document requests | DECISION_REQUIRED | Not shown | WEB-MKT-SRS-002 §31 only | Not documented. |
| 37 | Documents | OCR | NOT_PUBLISHED | Not shown | WEB-MKT-SRS-002 §5 | §5: not shown as a final capability without approval. |
| 38 | Finance | Billing and invoicing | AVAILABLE | /features/billing | SRS-SERVANTA-MASTER-001 v1.0 FR-BILL-001–008 |  |
| 39 | Finance | Payments | AVAILABLE | /features/payments | SRS-SERVANTA-MASTER-001 v1.0 FR-PAY-001–006 |  |
| 40 | Finance | Collections | AVAILABLE | /features/collections | SRS-SERVANTA-MASTER-001 v1.0 FR-COLLECT-001–006 |  |
| 41 | Finance | Profitability | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §6 Phase 3, OQ-006 | Phase 3. |
| 42 | Visibility | Command Center | AVAILABLE | /features/command-center | SRS-SERVANTA-MASTER-001 v1.0 FR-CMDCTR-001–005 |  |
| 43 | Visibility | Dashboard indicators and alerts | AVAILABLE | /features/command-center | SRS-SERVANTA-MASTER-001 v1.0 FR-CMDCTR-002–003, BR-CMDCTR-002 |  |
| 44 | Visibility | Reports | AVAILABLE | /features/reporting | SRS-SERVANTA-MASTER-001 v1.0 FR-REPORT-001–003 |  |
| 45 | Visibility | Advanced business reports | COMING_SOON | /features/reporting#coming-soon | SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts): advanced_reports "at launch" |  |
| 46 | Platform | Notifications | AVAILABLE | /features/notifications | SRS-SERVANTA-MASTER-001 v1.0 FR-NOTIFY-001–005 |  |
| 47 | Platform | Global search | AVAILABLE | /features/search | SRS-SERVANTA-MASTER-001 v1.0 §24 |  |
| 48 | Security | Authentication | AVAILABLE | /security#authentication | SRS-SERVANTA-MASTER-001 v1.0 FR-AUTH-001–006, §18 |  |
| 49 | Security | Multi-tenant isolation | AVAILABLE | /security#tenant-isolation | SRS-SERVANTA-MASTER-001 v1.0 §8.1, §11 |  |
| 50 | Security | Organizations and branches | AVAILABLE | /security#organizations | SRS-SERVANTA-MASTER-001 v1.0 FR-ORG-001–004 |  |
| 51 | Security | Users and roles | AVAILABLE | /security#access-control | SRS-SERVANTA-MASTER-001 v1.0 FR-USER-001–005, §10 |  |
| 52 | Security | Role-based access control | AVAILABLE | /security#access-control | SRS-SERVANTA-MASTER-001 v1.0 §10, BR-USER-001 |  |
| 53 | Platform | Audit logs | AVAILABLE | /features/audit-logs | SRS-SERVANTA-MASTER-001 v1.0 FR-AUDIT-001–005 |  |
| 54 | Security | MFA / 2FA | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §18 ADR-010 (optional, future) | §49: not shown because it is on the roadmap only. |
| 55 | Commercial | Pricing / plans | AVAILABLE | /pricing | SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts) | Published on the Pricing page from the pricing source, not on the capability map. |
| 56 | Commercial | Entitlements | INTERNAL | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §8.20 | Internal; surfaces indirectly through Pricing. |
| 57 | Commercial | Referral / affiliate | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §8.22 (Phase 2) | Phase 2; no marketing need approved. |
| 58 | Platform | API | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §6 Phase 5 | Not published (Phase 5). |
| 59 | Platform | Webhooks | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §6 Phase 5, Tranche 4 | Not published. |
| 60 | Platform | Integration hub | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §6 Tranche 4, §31 | Roadmap; no vendor integrations are approved. |
| 61 | Intelligence | AI / Copilot | ROADMAP | Not shown | SRS-SERVANTA-MASTER-001 v1.0 §6 Phase 4; WEB-MKT-SRS-002 §53 | §53: never shown as available; roadmap display not approved. |


## Module records (§55)

| Module key | Name (EN) | Name (AR) | Category | Status | Visual | Related modules | Source |
|---|---|---|---|---|---|---|---|
| customer-management | Customer Management | إدارة العملاء | customer | AVAILABLE | customer (illustrative) | contracts, work-orders, billing | SRS-SERVANTA-MASTER-001 v1.0 §8.5 FR-CUST-001–008, BR-CUST-001–003 |
| contracts | Contract Management | إدارة العقود | contracts | AVAILABLE | contract (illustrative) | scheduling, billing, customer-management | SRS-SERVANTA-MASTER-001 v1.0 §8.6 FR-CONTRACT-001–008, BR-CONTRACT-001–004, §38 state machine |
| scheduling | Services & Scheduling | الخدمات والجدولة | operations | AVAILABLE | schedule (illustrative) | contracts, work-orders, command-center | SRS-SERVANTA-MASTER-001 v1.0 §8.7 FR-SERVICE-001–004, §8.8 FR-SCHED-001–006 |
| work-orders | Work Orders & Field Operations | أوامر العمل والعمليات الميدانية | operations | AVAILABLE | workOrder (illustrative) | scheduling, billing, command-center | SRS-SERVANTA-MASTER-001 v1.0 §8.9 FR-WO-001–007, §8.10 FR-FIELD-001–006, BR-WO-002, BR-FIELD-001–002, §38 state machine |
| billing | Billing & Invoicing | الفوترة وإصدار الفواتير | finance | AVAILABLE | invoice (illustrative) | work-orders, payments, collections | SRS-SERVANTA-MASTER-001 v1.0 §8.11 FR-BILL-001–008, BR-BILL-001–009, §38 state machine |
| payments | Payments | المدفوعات | finance | AVAILABLE | payment (illustrative) | billing, collections, reporting | SRS-SERVANTA-MASTER-001 v1.0 §8.12 FR-PAY-001–006, BR-PAY-001–004 |
| collections | Collections | التحصيل | finance | AVAILABLE | collections (illustrative) | billing, payments, command-center | SRS-SERVANTA-MASTER-001 v1.0 §8.13 FR-COLLECT-001–006, BR-COLLECT-001–003 |
| command-center | Command Center | مركز التحكم | visibility | AVAILABLE | commandCenter (illustrative) | reporting, collections, work-orders | SRS-SERVANTA-MASTER-001 v1.0 §8.14 FR-CMDCTR-001–005, BR-CMDCTR-001–002 |
| reporting | Reporting | التقارير | visibility | AVAILABLE | report (illustrative) | command-center, billing, collections | SRS-SERVANTA-MASTER-001 v1.0 §8.16 FR-REPORT-001–003, BR-REPORT-001 |
| notifications | Notifications | الإشعارات | visibility | AVAILABLE | notifications (illustrative) | command-center, contracts, collections | SRS-SERVANTA-MASTER-001 v1.0 §8.15 FR-NOTIFY-001–005, BR-NOTIFY-001–002, §22 |
| audit-logs | Audit Logs | سجلات التدقيق | governance | AVAILABLE | audit (illustrative) | search, command-center, reporting | SRS-SERVANTA-MASTER-001 v1.0 §8.17 FR-AUDIT-001–005, BR-AUDIT-001–003, §19 |
| search | Global Search | البحث الشامل | visibility | AVAILABLE | search (illustrative) | customer-management, contracts, work-orders | SRS-SERVANTA-MASTER-001 v1.0 §24 Global Search |
