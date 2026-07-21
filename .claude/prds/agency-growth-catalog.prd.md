# Sunday Vibes — Agency Growth & Systems Catalog

## Problem
Sunday Vibes already delivers design, IT, marketing, and automation execution, but lacks the *business layer* that makes clients buy, repeat, and upgrade — strategy consulting, performance analytics, CRM/retention systems, AI integration, and productized growth packages. Without this layer, the agency is positioned as a vendor (priced per unit) rather than a growth partner (priced per outcome), capping margin and client retention.

## Evidence
- Assumption — needs validation via {sales call transcripts | inquiry analytics | lost-deal review}.
- Catalog audit: `assets/katalog.md` lists design/IT/marketing/automation but no strategy, CRO, CRM, AI-integration, or productized package offers as live, priced SKUs.

## Users
- **Primary**: UMKM owners and mid-market brand operators in Tuban/Surabaya + global remote, who have execution coverage but lack a strategy + systems partner to turn traffic into repeatable revenue.
- **Not for**: One-off retail clients wanting a single logo or single landing page (handled by existing per-unit SKUs).

## Hypothesis
We believe **adding a Strategy→Performance→Automation→Packages service stack with productized growth packages** will **convert vendor relationships into retainer growth partnerships** for **UMKM/mid-market clients**. We'll know we're right when **≥3 clients subscribe to a monthly Growth Package within 90 days of launch**.

## Success Metrics
| Metric | Target | How measured |
|---|---|---|
| Growth Package subscribers | ≥3 within 90 days | CRM/invoice records |
| Average revenue per client (ARPC) | +40% vs pre-launch | Finance report |
| Retainer retention rate | ≥80% at 6 months | CRM renewal data |
| Inbound strategy consultations | ≥10/mo after launch | Booking form entries |

## Scope
**MVP** — Launch the 6-layer catalog as live, priced, bookable offers with static landing pages per category + a productized 3-tier Growth Package (Starter/Business/Enterprise), and a booking CTA into a lightweight lead pipeline.

**Out of scope**
- DB-driven/Payload rendering of service detail pages — current static pages are the single source of truth (per recent dead-code removal).
- Full CRM/automation backend build — sold as a service, not built internally first.
- Global premium rebrand — separate initiative; catalog uses existing Sunday Vibes brand.
- Marketplace (Tokopedia/Shopee) execution tooling — offer scoped to audit/optimization consulting only.

## Delivery Milestones
<!-- Business outcomes, not engineering tasks. /plan turns each into a plan. -->
<!-- Status: pending | in-progress | complete -->

| # | Milestone | Outcome | Status | Plan |
|---|---|---|---|---|
| 1 | Catalog landing pages live | 4 new category pages (strategy, performance, automation, packages) render with pricing + booking CTA | complete | — |
| 2 | Productized Growth Packages pricing | Starter/Business/Enterprise tiers published with clear feature matrix, no per-unit negotiation | in-progress | — |
| 3 | Lead pipeline + booking intake | Booking form routes to a tracked lead pipeline (WhatsApp/email funnel) | pending | — |
| 4 | Analytics & CRO offer deliverable | Repeatable audit checklist + report template for Digital Growth Audit + CRO engagements | pending | — |
| 5 | AI integration SKU operational | One reference AI chatbot deployment for a pilot client | pending | — |

## Open Questions
- [ ] Are the 4 seeded `services` DB rows (strategy/performance/automation/packages) still needed now that rendering is static? Candidate for removal.
- [ ] Is `src/collections/Services.ts` Payload collection still used by admin, or fully dead after static-page decision?
- [ ] What is the actual close rate / inbound volume today? Needed to validate the ≥3-subscribers-in-90-days target.
- [ ] Pricing validated against market? The IDR ranges in katalog.md are proposed, not market-tested.

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Pricing not market-validated | High | Medium | Pilot 2-3 proposals at proposed prices; adjust before broad publish |
| Scope creep into building internal CRM | Medium | High | Sell CRM setup as service; use off-the-shelf tools internally first |
| Catalog breadth dilutes positioning | Medium | Medium | Lead with Growth Packages; list other layers as supporting |
| Static pages drift from any future DB source | Low | Low | Document static-as-SSOT decision in repo |

---
*Status: DRAFT — requirements only. Implementation planning pending via /plan.*
