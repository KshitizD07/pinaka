# 07 — Repo Standards & Templates

## Standard repo layout (web product)

```
<product>/
├── README.md                 # see template below
├── LICENSE
├── CONTRIBUTING.md           # points to studio workflow docs
├── .github/
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/       # bug_report.md, feature_request.md
├── docs/
│   ├── architecture.md       # + diagram (Mermaid ok)
│   ├── runbook.md            # deploy, rollback, backup-restore
│   ├── adr/                  # numbered architecture decision records
│   └── research/             # experiments, results (research products especially)
├── src/  (or app/, packages/, per stack)
├── tests/
├── scripts/                  # setup, seed, migration helpers
├── .env.example
├── docker-compose.yml        # local stack
└── Dockerfile
```

## README template (every repo)

```markdown
# <Product Name>

**Status:** prototype | mvp | deployed | commercially validated   <!-- keep honest & current -->
**Owner:** <name>
**Studio:** Pinaka

## What it does
2–3 sentences, user-facing. Link the problem brief.

## Current status & known limitations
Be specific: what works, what doesn't, what's untested.

## Quick start (local)
<commands — must work from a fresh clone>

## Architecture
Link docs/architecture.md. Include the diagram inline if short.

## Tech stack & key dependencies
<list with one-line rationale per major choice>

## Testing
<how to run, what CI enforces>

## Deployment
Link docs/runbook.md.

## Contributing
Link CONTRIBUTING.md.

## License & ownership
<license; original authors; any third-party/competition/institutional terms that apply>
```

## Issue conventions

- `bug:` — something broken; include repro steps, expected vs actual, environment.
- `feat:` — new capability; must reference the problem/requirement it serves.
- `chore:` — tooling, deps, docs.
- `research:` — question to answer with an experiment, not code. Must define the experiment and the evidence that would settle it.
- Every issue has one owner and a rough size (S/M/L). No issue sits unowned for > 1 sprint.

## README honesty rule

The README must reflect the product's true status at all times. A prototype labeled
"deployed" destroys studio credibility faster than a prototype labeled "prototype" ever will.
