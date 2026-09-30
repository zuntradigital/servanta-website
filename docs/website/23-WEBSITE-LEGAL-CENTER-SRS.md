# Website Legal Center: implementation notes

Source: `MOD-LEGAL-CENTER-AND-PUBLIC-WEBSITE-SRS.md`. The source has **no legal prose**, and it forbids fabricating any (no invented clauses, deadlines, retention periods or liability terms). So everything below is structure, and every document is `LEGAL_REVIEW`.

## Routes
| Route | Purpose |
|---|---|
| `/{en,ar}/legal` | Legal Center: public documents by category, with a status badge |
| `/{en,ar}/legal/{slug}` | One document. Shows "Final text pending legal review" until it is published |
| `/{en,ar}/legal/contact` | Legal & privacy request form (`legal_request`) |
| `/privacy`, `/terms`, `/cookies`, `/refund-policy` | 308 redirect to the `/legal/…` equivalents |

## Catalog (`src/content/pages/legal.ts`)
Public: terms, subscription, acceptable-use, refunds-cancellation, privacy, cookies, third-party-services, electronic-transactions, contract-library-disclaimer, intermediary-disclosure, and the legal contact.
Not public: DPA (authenticated, DRAFT), data-retention (DRAFT), security (DRAFT).

## Publishing a document
When counsel approves a document, add its body, set `status: "PUBLISHED"`, and fill in `version`, `effectiveFrom` and `lastUpdated`. The page and the Legal Center card then show the version and dates instead of the pending notice.

## Open items
- Show pending documents publicly, or hide them until published (AC-LC-002)?
- Should placeholder pages be indexed by search engines?
- The docs this SRS mentions (`docs/website/02…21`, `LEGAL-COMPLIANCE-REGISTER.md`, `66-OPEN-QUESTIONS.md`, `70-CANONICAL-TERMINOLOGY-REGISTER.md`) are not in this repository.
