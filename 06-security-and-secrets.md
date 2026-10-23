# 06 — Security & Secrets Handling

Security bar scales with product stage, but the **floor** below applies everywhere.

## Secrets (non-negotiable)

- Never commit secrets. Pre-commit hooks (`gitleaks` / `detect-secrets`) + CI secret scan on every PR.
- Secrets live in the hosting platform's secret store / env vars (GitHub Actions secrets,
  platform env). `.env.example` documents keys **without values**.
- Rotate any secret that ever appears in git history: rotate first, then purge history if needed.
- Different credentials per environment; production credentials accessible to the minimum set of people.
- Personal access tokens: minimum scopes, expiry dates, tied to individuals.

## Dependencies & supply chain

- Pin dependencies (lockfiles committed); CI runs `npm audit` / `pip-audit` / `govulncheck`
  (or equivalent) — new **high/critical** findings block merge.
- Avoid new dependencies without justification in the PR (bundle size + maintenance burden + risk).
- GitHub Dependabot/Renovate enabled on every repo; security patches applied within days.

## Application security baseline

- Auth: established libraries/frameworks only (no hand-rolled crypto or sessions).
- Passwords: hashed with bcrypt/argon2; enforce reasonable length, no silly composition rules.
- All external input validated; parameterized queries / ORM only; output encoding to stop XSS.
- Security headers (CSP, HSTS, X-Frame-Options, etc.) on web products.
- HTTPS everywhere; HSTS in production.
- Rate limiting on auth and expensive endpoints.

## Data protection (SkillSphere = user data, so this bites early)

- Collect the minimum personal data needed; document what/why in the product README + privacy note.
- Encrypt data at rest where the platform supports it; TLS in transit.
- Users can export and delete their data (build this into MVP design, not as an afterthought).
- Third-party services (analytics, email) disclosed; no silent trackers.
- For research products: only public/synthetic/licensed datasets; dataset provenance recorded.

## Access control

- Repo roles: admin (studio lead + engineering lead), write (active contributors), read (external).
- Remove access promptly when contributors leave; review repo membership quarterly.
- Production access = named individuals only, logged.

## Incident basics

If a breach/exposure happens: (1) contain — revoke/rotate, (2) assess scope, (3) notify the
studio lead + product owner immediately, (4) document timeline and fixes in a post-incident note,
(5) fix the process gap. No blame; honesty over PR.
