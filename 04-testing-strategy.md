# 04 — Testing Strategy

Test depth is **proportional to risk and product stage**. Do not gold-plate tests for a
throwaway prototype; do not ship a user-facing MVP without them.

## Test pyramid (web products, e.g., SkillSphere)

```
        ╱  E2E (few)  ╲          Playwright / Cypress — critical user journeys only
       ╱ Integration  ╲        API tests, DB integration — service boundaries
      ╱   Unit (many)  ╲      Pure logic, utilities, business rules — fast, isolated
```

| Layer | Scope | Tooling suggestion | When required |
|---|---|---|---|
| Unit | Functions, business logic | Jest / Vitest / pytest | Always, from first commit |
| Integration | API endpoints, DB, auth flows | Jest + supertest / pytest / Postman collections | From MVP onward |
| E2E | Critical journeys (signup → profile → match) | Playwright | Before pilot (Stage 5) |
| Load/perf | API latency, concurrent users | k6 / Locust | Before any pilot > 50 users |
| Security | Dependency scan, SAST, headers | See `06-security-and-secrets.md` | Always in CI |

## Research/simulation products (e.g., Intelli-Light)

- **Reproducibility is the test**: fixed seeds, versioned configs, deterministic environments.
- Baseline comparison harness: run experiment + baseline on identical scenarios, diff the metrics.
- Tests: environment invariants, agent/env interfaces, metric computation correctness.
- Every experiment run produces an artifact bundle: config, seed, code version (git sha), raw results, plots.

## Quality gates

- **Prototype (`concept`/`prototype`)**: CI = build + lint + unit tests. No coverage gate.
- **MVP (`mvp`)**: CI adds integration tests. Coverage gate set by engineering lead (e.g., ≥ 60% on core modules).
- **Deployed (`deployed`)**: adds E2E for critical journeys, load test before pilots, security scan must pass.
- **Commercially validated**: full gates + SLOs, incident runbooks, rollback drills.

## Rules

1. Every bug fix ships with a regression test.
2. Flaky tests are fixed or quarantined within one sprint — never ignored.
3. Tests must run locally in < 5 minutes; slower suites run in CI nightly.
4. Test data must be synthetic or anonymized. Never commit real user data.
