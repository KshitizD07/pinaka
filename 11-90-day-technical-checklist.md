# 11 — 90-Day Technical Checklist

Engineering translation of the strategy's 90-day roadmap (§14). Tasks are concrete and checkable.

## Days 1–30 — Foundation
- [ ] Agree studio vision/principles (whole team) → record in studio repo `README.md`
- [ ] Name studio lead, engineering lead, product owners (recorded in `docs/team.md` or equivalent)
- [ ] Audit SkillSphere & Intelli-Light repos: build status, tests, secrets exposure, ownership/licensing (output: audit note per product)
- [ ] Select **one primary product**; the other moves to maintenance/research track
- [ ] Create/standardize repos: README template applied, LICENSE chosen, CONTRIBUTING, PR template, issue templates, branch protection on `main`
- [ ] Add CI baseline to primary product: lint + unit tests + build (GitHub Actions)
- [ ] Add secret scanning: pre-commit (`gitleaks`) + CI scan
- [ ] Define product case-study template (use `templates/product-case-study-template.md`)
- [ ] User research or experiment plan drafted (what evidence, from whom, by when)
- [ ] Pinaka website v1 live: honest studio + product descriptions with correct status labels, links to repos/demos
- [ ] Contributor expectations written: availability, ownership/licensing, how decisions are made (strategy §13.5)

## Days 31–60 — Execution
- [ ] Primary product: highest-priority milestones shipped through the PR workflow (PRs ≤ ~400 lines, reviewed < 48h)
- [ ] Testing at the stage's quality gate (see `04-testing-strategy.md`); regression tests for fixed bugs
- [ ] Deployment workflow: staging auto-deploy, prod deploy = product-owner approval, rollback tested once
- [ ] Documentation pass: architecture diagram, runbook (deploy/rollback/backup), ADRs for major decisions so far
- [ ] Pilot/experiment executed and evidence recorded (user sessions or reproducible experiment + results artifact)
- [ ] Technical risks register created (`docs/risks.md`) — top 5 risks with owner and mitigation
- [ ] Mid-point retro: process friction identified and one process change adopted

## Days 61–90 — Evaluation
- [ ] Evaluation report per `08-lifecycle-gates.md` Gate 5 (metrics, limitations, next steps)
- [ ] Portfolio decision documented with evidence: continue / pivot / commercial pilot / open-source / pause / kill
- [ ] Cost review: infra spend vs value; documented decision on any paid tier
- [ ] Bus-factor check: can ≥ 2 people deploy and roll back each deployed product?
- [ ] Case study published on the site (problem, users, solution, status, architecture, evidence, limitations, next steps)
- [ ] Public retrospective published: what was learned, what failed, what changes — studio credibility asset

## Anti-patterns to refuse (from strategy §16)
- Starting a second primary product before the first hits Gate 5
- Shipping features with no validation path attached
- Letting one person be the only deployer/understander of a system
- Prototype labeled as product; product labeled as business
- Infrastructure more complex than the product needs (every piece needs an ADR or it gets removed)
