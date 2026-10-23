# 08 — Product Lifecycle Gates (Go / No-Go Checklists)

Companion to strategy §7. Each stage ends with a gate: a documented decision
(continue / revise / reject) signed off by the studio lead + product owner.
Use the templates in `templates/` for each deliverable.

## Gate 1 — Problem Discovery → Opportunity Evaluation
**Deliverable:** Problem brief (`templates/problem-brief-template.md`)
- [ ] Target users identified and reachable
- [ ] Problem described with evidence (interviews, observations, data) — not just opinion
- [ ] Current alternatives documented
- [ ] Why existing solutions are insufficient stated honestly

## Gate 2 — Opportunity Evaluation → Validation/Experimentation
**Deliverable:** Opportunity evaluation doc (`templates/opportunity-evaluation-template.md`)
- [ ] Severity/frequency of problem rated
- [ ] Competition & alternatives assessed
- [ ] Technical feasibility assessed by engineering lead
- [ ] Time/resources/cost estimate
- [ ] Legal/security/privacy/safety constraints listed
- [ ] Decision recorded: investigate / revise / reject (rejection is a valid, valuable outcome)

## Gate 3 — Validation → MVP
**Deliverable:** Experiment report + evidence
- [ ] Riskiest assumption named explicitly
- [ ] Smallest experiment designed and run (prototype / manual workflow / PoC / simulation vs baseline)
- [ ] Evidence documented (what supported, what challenged the assumption)
- [ ] Go/no-go: only proceed if evidence justifies investment

## Gate 4 — MVP → Pilot
**Deliverable:** Functioning MVP
- [ ] Core value workflow works end-to-end
- [ ] CI/CD green; secrets handled; basic security baseline met (§06)
- [ ] Status label = `mvp` in README
- [ ] Pilot plan: who tests it, what "useful" means, how it's measured

## Gate 5 — Pilot → Portfolio Decision
**Deliverable:** Evaluation report
- [ ] Pilot ran with real target users or reproducible experiment
- [ ] Metrics defined in Gate 4 collected
- [ ] Limitations and failures documented (required, not optional)
- [ ] Decision recorded with evidence: continue / pivot / commercial pilot / open-source / pause / kill

## Portfolio rules of thumb

- **One primary product** at a time until the team proves it can deliver; one secondary
  research/maintenance track maximum.
- A paused/killed project must have a short retrospective (`templates/retrospective-template.md`)
  — the learning is an asset of the studio.
- Every product decision is reversible except spending users' trust; protect that.
