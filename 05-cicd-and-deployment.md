# 05 — CI/CD & Deployment

## Environments

| Environment | Purpose | Data | Access |
|---|---|---|---|
| `local` | Dev machines | Synthetic | Every contributor |
| `staging` | Pre-release validation, demos | Synthetic / anonymized snapshot | Team only |
| `production` | Live product | Real users | On-call + product owner |

- Promote the **same artifact** (container image / build) through environments — never rebuild for prod.
- Differences between environments live only in environment variables / secrets, never in code.

## Standard CI pipeline (runs on every PR and on `main`)

```
lint → unit tests → build → integration tests → security scan (deps + secrets)
                                            → (on main) deploy to staging
```

## Standard CD flow

1. Merge to `main` → auto-deploy to **staging** + smoke tests + e2e critical journeys.
2. **Production deploy** = manual approval by product owner (button push, not ssh).
3. Every deploy: version tag, changelog entry, one-command rollback (previous artifact).
4. Post-deploy verification: health checks + key business metrics for 15 minutes.

## Health checks & observability (minimum)

- `/healthz` (liveness) and `/readyz` (readiness, checks DB/dependencies).
- Structured logs (JSON), correlation/request ID, log levels used consistently.
- Error tracking (e.g., Sentry free tier) on deployed products.
- Uptime monitoring with alert to product owner + on-call.

## Infrastructure principles (bootstrapped phase)

- Prefer managed free tiers (render/railway/fly/vercel/Neon free tiers, GitHub Actions) over
  self-hosted servers.
- Containerize early (`Dockerfile` per service) so migration between hosts is trivial.
- Infra as code where cheap: one `docker-compose.yml` for local, keep a `deploy/` or
  `infra/` directory per product. Graduate to Terraform only when a product justifies it.
- Document, per product, in `docs/runbook.md`: deploy steps, rollback, restore-from-backup, common failures.

## Backup & recovery

- Any product storing user data: automated backups, tested restore **monthly** (an untested backup is not a backup).
- RPO/RTO targets documented: prototype RPO 24h / RTO best-effort; user-facing MVP RPO 24h / RTO 4h.
