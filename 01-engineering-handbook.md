# 01 — Engineering Handbook (Shared Baseline)

Applies to every Pinaka repository and product. Product teams may go *stricter* than this
baseline, never looser, without a documented engineering decision (see ADR template).

## 1. Repository management

- One product = one repo (or one clearly documented monorepo structure).
- Default branch is `main` and is **protected** (see `02-git-workflow.md`).
- Every repo must contain from day one:
  - `README.md` (use template in `07-repo-standards-and-templates.md`)
  - `LICENSE` (chosen deliberately; default recommendation: MIT for open tooling, proprietary/closed for commercial candidates — decide per product, record it)
  - `CONTRIBUTING.md`
  - Issue templates (bug report + feature request minimum)
  - A documented dev setup that a new contributor can complete in under 30 minutes

## 2. Code review (non-negotiable)

- No direct pushes to `main`. All changes via pull request with at least **one approving review**
  from someone other than the author.
- PRs use the template in `03-pr-review-checklist.md`.
- Reviews focus on: correctness, maintainability, security, clarity — not style nitpicks
  (enforce style with linters/formatters instead).

## 3. Testing

- Test depth is proportional to risk (see `04-testing-strategy.md`).
- CI runs the test suite on every PR; PRs that fail CI are not merged.
- New user-facing behavior ships with tests, or the PR explains why tests are not feasible.

## 4. Deployment & operations

- Everything deployed is: versioned, reproducible from source, has health checks, and has
  documented rollback (see `05-cicd-and-deployment.md`).
- Secrets never in code, never in the repo (see `06-security-and-secrets.md`).
- Free/low-cost tiers are fine for prototypes; document the cost-trigger at which a paid tier
  becomes necessary and who approves it.

## 5. Documentation

- Docs live **in the repo**, next to the code, and stay in sync with releases.
- Required docs per product: purpose, setup, architecture (with a diagram), key dependencies,
  deployment runbook, known limitations, contribution workflow.
- Significant technical decisions are recorded as ADRs (`templates/adr-template.md`).
- Every product publishes an honest **status label**: `concept` / `prototype` / `mvp` /
`deployed` / `commercially validated`. This label appears in the README and the website.

## 6. Simplicity rule

> Use the simplest architecture that satisfies the product's actual needs. Introduce more
> sophisticated infrastructure only when there is a clear technical or operational reason,
> recorded in an ADR.

## 7. Definition of Done (applies to every task)

A task is done when:
- [ ] Code is reviewed and merged to `main`
- [ ] CI passes (build + tests + lint)
- [ ] Behavior is covered by tests appropriate to its risk
- [ ] Docs/README updated if behavior or setup changed
- [ ] No new secrets, credentials, or personal data in the repo
- [ ] Product owner (or reviewer) has verified acceptance criteria
