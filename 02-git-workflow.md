# 02 — Git Workflow

## Branching model (trunk-based, lightweight)

```
main  ─────────────●──────────●──────────►  (protected, always releasable)
        \          / \        /
feature/…  ──●──●───   \      /
                      \      /
hotfix/…  ──────────────●───■──►  (fast-track, still needs review)
release tags:  v0.1.0  v0.2.0 …
```

- `main` is always releasable. Work happens on short-lived branches (`feature/`, `fix/`, `hotfix/`, `exp/`).
- Aim for branch lifetime < 1 week; rebase on `main` frequently to keep diffs small.
- Tag releases with semver: `vMAJOR.MINOR.PATCH`.
- Research/experiment code lives on `exp/` branches or clearly marked directories and is
  never merged without the normal review bar.

## Commit conventions

Use Conventional Commits:

```
feat(scope): add alumni discovery endpoint
fix(auth): handle expired refresh tokens
docs(readme): update setup instructions
test(matching): squad matching edge cases
chore(ci): pin action versions
```

- One logical change per commit; no `--force` pushes to shared branches (force-push your own
  feature branch after rebase is acceptable if coordinated).
- Commit messages explain **why**, not just what.

## Pull request flow

1. Create branch from latest `main`: `feature/<short-kebab-description>`
2. Open a **draft PR** early (within the first day of work) so progress is visible.
3. Mark ready for review only when: CI green, self-reviewed, acceptance criteria met.
4. One approving review required; engineering lead reviews anything touching security,
   infra, architecture, or cross-product dependencies.
5. Squash-merge or merge-commit — pick **one** per repo and document it; default: squash-merge.
6. Delete the branch after merge.

## Protected branch settings (GitHub example)

- Require pull request reviews before merging: **1 approval**, dismiss stale approvals on new commits.
- Require status checks to pass: CI (build, lint, test).
- Require branches to be up to date before merging.
- Block force pushes. Restrict who can push to `main`: maintainers only.
- Require linear history (optional but recommended).
