# 03 — Pull Request Template & Review Checklist

Save this as `.github/pull_request_template.md` (or equivalent) in every repo.

---

```markdown
## What changed
<!-- One or two sentences. Link the issue: Closes #123 -->

## Why
<!-- What problem does this solve? Which assumption or requirement does it address? -->

## How it was tested
<!-- Commands run, environments used, manual steps -->

- [ ] Unit / integration tests added or updated
- [ ] Tested locally end-to-end
- [ ] Tested against staging (if applicable)

## Risk assessment
- [ ] No effect on security, auth, data, or payments
- [ ] Touches: security / auth / data / infra / public API (needs engineering-lead review)

## Checklist
- [ ] CI is green (build, lint, tests)
- [ ] No secrets, credentials, or personal data added
- [ ] README / docs updated if behavior or setup changed
- [ ] Migrations are reversible and safe
- [ ] Acceptance criteria from the linked issue are met
```

---

## Reviewer checklist

Reviewers verify, in order of importance:

1. **Correctness** — Does the code do what the PR claims? Any logic errors, race conditions,
   off-by-one, unhandled failure modes?
2. **Security** — Injection, auth bypass, data exposure, unsafe deserialization, new
   dependencies are pinned and reputable?
3. **Maintainability** — Will the next contributor understand this in 3 months? Naming,
   structure, no dead code, no speculative abstraction?
4. **Clarity** — Is the PR small enough to review well (< ~400 lines of diff ideally)?
5. **Tests** — Do the tests actually prove the behavior, including failure paths?

## Review etiquette

- Review within 24–48 hours; if you can't, say so so someone else can pick it up.
- Ask questions before demanding changes; distinguish **blockers** from **suggestions**.
- Approve explicitly; do not merge someone else's PR without their consent.
- Disagreements that can't be resolved in the PR → raise in team channel, escalate to the
  person with the relevant decision responsibility (see strategy §13.4).
