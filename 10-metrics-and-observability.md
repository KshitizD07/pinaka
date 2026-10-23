# 10 — Metrics & Observability

Measure **outcomes, not activity**. Commits, repo count, and stars are vanity metrics.
Instrument these instead (definitions live in each product's `docs/metrics.md`).

## Product indicators
| Metric | How measured | Used at gate |
|---|---|---|
| Core workflow completion rate | Funnel events: started → completed signup / profile / request flow | Gate 5 |
| Activation (user reaches "aha" moment) | e.g., SkillSphere: first accepted mentorship within 7 days of signup | Gate 5 |
| Retention | % users active week 1 / week 4 | Gate 5 |
| Task success in pilots | Structured feedback forms + observation notes | Gate 5 |
| Simulation performance vs baseline | Avg wait time / throughput delta vs best baseline, same scenario+seed | Intelli-Light gates 3–5 |

## Engineering indicators
- CI pass rate & time-to-merge (target: < 48h median)
- Deploy frequency, failed deploy rate, rollback count
- Mean time to detect / resolve incidents (MTTD/MTTR)
- Flaky test count (target: 0 quarantined > 2 weeks)
- Crash/error rate on deployed products (Sentry: new errors → 0 known regressions shipped)

## Team indicators
- Agreed deliverables completed per sprint/period
- Review turnaround time (< 48h)
- Time blocked (hours waiting on another person/decision)
- Bus factor: how many people can deploy each product alone (target ≥ 2)

## Business indicators (only when commercially relevant)
- Customer/user interviews completed and synthesized (count + insights doc)
- Pilot commitments (verbal → written)
- Willingness-to-pay evidence (pre-orders, LOIs, paid pilot contracts) — not surveys alone
- Operating cost per product per month; cost per active user

## Instrumentation rules
1. Every event has a name, owner, and question it answers. No orphan analytics.
2. Track only what the current stage needs — an `mvp`-stage product doesn't need a BI stack.
3. Dashboards: one per product in the cheapest adequate tool (even a markdown file updated weekly is fine early on).
4. Metrics feed gates (see `08-lifecycle-gates.md`) — a metric with no decision attached to it gets deleted.
