# PINAKA — Technical Documentation Pack

Companion docs to the *Pinaka: Building an Independent Product Studio* strategy proposal.
Everything here is executable: conventions, checklists, templates, and gates that the team
applies to every product in the portfolio.

## How to use this pack

1. Copy the templates in `templates/` into new projects when they are accepted into the portfolio.
2. Apply `01-engineering-handbook.md` to **all** repos; it is the shared baseline.
3. Use `08-lifecycle-gates.md` as the go/no-go checklist for every stage (Problem Discovery → Portfolio Decision).
4. Use `11-90-day-technical-checklist.md` to translate the 90-day roadmap into concrete engineering tasks.

## Index

| File | Purpose |
|---|---|
| `01-engineering-handbook.md` | Shared engineering baseline: repos, code review, testing, docs, deployment, infra |
| `02-git-workflow.md` | Branching model, commit conventions, PR process |
| `03-pr-review-checklist.md` | Mandatory PR template and review checklist |
| `04-testing-strategy.md` | Test pyramid per product type, coverage and quality gates |
| `05-cicd-and-deployment.md` | CI/CD workflows, environments, deployment runbook |
| `06-security-and-secrets.md` | Secrets handling, dependency security, access control, data protection |
| `07-repo-standards-and-templates.md` | Standard repo layout, README template, CONTRIBUTING template |
| `08-lifecycle-gates.md` | Stage-by-stage deliverables and go/no-go criteria |
| `09-product-tech-notes.md` | Technical considerations for SkillSphere, Intelli-Light, and Sentinel |
| `10-metrics-and-observability.md` | What to measure (product, engineering, business) and how to instrument it |
| `11-90-day-technical-checklist.md` | Engineering tasks mapped to the 90-day roadmap |
| `templates/` | Copy-paste templates: problem brief, opportunity evaluation, ADR, product case study, retrospective, contributor agreement checklist |

## Golden rules

- Products earn their place through **execution and evidence**, not idea attractiveness.
- Start every product from the **problem**, not a technology.
- Every active product has a named **owner** and a written status.
- The **simplest architecture that works** wins; complexity must be justified.
- Never present a prototype as a deployed product or a deployed product as a business.
