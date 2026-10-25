# 09 — Product Technical Notes

## 9.1 SkillSphere (student networking & mentorship platform)

**Type:** web product, user data, potential institutional customers.
**Status targets:** `prototype` → `mvp` → pilot with a real student/alumni group.

### Recommended starter stack (choose for team familiarity + low cost, adjust with ADR)
- Frontend: React/Next.js (SSR for SEO/discovery pages) or plain React + Vite for pure SPA MVP
- Backend: Node (Express/Fastify) or Python (FastAPI) — pick the team's strongest
- DB: PostgreSQL (Neon/Supabase free tier); Redis only if actually needed
- Auth: established provider (Clerk/Supabase Auth/Auth.js) — do not hand-roll auth
- Hosting: Vercel/Render/Fly free tiers; GitHub Actions CI

### Data model sketch (MVP scope)
- `users` (auth identity, role: student | alumni | admin)
- `profiles` (skills, bio, links to evidence of work — GitHub/Portfolio)
- `skills` + `user_skills` (normalized skills taxonomy, self-declared + evidence-backed)
- `requests` / `connections` (mentorship or collaboration requests with state machine:
  pending → accepted → completed/cancelled)
- `squads` (project groups) + `squad_memberships`
- `feedback` (post-interaction ratings/notes — feeds evaluation metrics)

### MVP must-haves (before pilot)
- [ ] Auth (email + one OAuth provider), email verification
- [ ] Profile CRUD + skills with evidence links
- [ ] Discovery: search/filter by skill, role, institution
- [ ] Mentorship request flow with states + notifications (email or in-app)
- [ ] Basic admin tooling (view users, flag content)
- [ ] Data export & account deletion (privacy baseline, §06)
- [ ] E2E tests for: signup → complete profile → find user → send request → accept

### Key risks to design against
- Cold start (empty network) → seed with a real cohort, or make profiles valuable to read even without connections
- Privacy of students → minimal data collection, visible privacy note, no public contact info until mutual consent
- Matching quality → start with search/filter; don't build an ML recommender before validating manual matching works

## 9.2 Intelli-Light (adaptive traffic signal control research)

**Type:** research/simulation product. Success = credible, reproducible experimental evidence.

### Recommended structure
```
intelli-light/
├── env/                  # simulation environment wrapper (e.g., SUMO via TraCI)
├── baselines/            # fixed-time, actuated, greedy controllers
├── agents/               # MARL agents (e.g., PyTorch RLlib / stable-baselines3 / custom PettingZoo)
├── scenarios/            # network files (SUMO .net/.rou) + demand configs
├── experiments/          # experiment runner: config → run → metrics artifacts
├── analysis/             # notebooks/scripts: results → tables/plots
└── docs/research/        # experiment reports, benchmarks, lessons
```

### Experimental protocol (make this the product's spine)
1. **Defined scenarios:** e.g., uniform grid, rush-hour corridor, accident perturbation.
   Each scenario has: network file, demand profile, random seed, duration.
2. **Baselines:** fixed-time, actuated (vehicle-actuated), simple greedy — implemented and validated.
3. **Metrics:** average/inter-quantile waiting time, throughput, queue lengths, fairness across approaches; compute per-vehicle and per-intersection.
4. **Reproducibility:** every run records git sha, config, seed → results directory `results/<exp>/<date>/<sha>/`; plots generated from artifacts, never hand-made.
5. **Claims discipline:** report negative results too; simulation ≠ deployable real-world control — state deployment constraints explicitly (safety validation, hardware, stakeholder engagement).

### Suggested technical path
- Phase A: environment + baselines + metric harness working on one scenario
- Phase B: single-agent RL on one intersection vs baselines
- Phase C: MARL (graph/coordination) on multi-intersection grid; sensitivity analysis across demand levels
- Phase D (optional): decision-support tooling or small pilot analysis — only if results justify it

### Engineering notes
- Separate the simulation dependency (SUMO) via Docker so every contributor runs identical versions
- Keep agent training runs out of CI; CI runs short smoke episodes (tiny scenario, few steps) to catch interface regressions
- Version scenario assets like code; a changed demand profile without a version bump invalidates past comparisons

## 9.3 Sentinel (City-Wide ANPR Trajectory Tracking & Intercept Orchestration)

**Type:** defense / civic surveillance intelligence layer.
**Status targets:** `prototype` → `pilot` evaluation on municipal traffic camera grids.

### Recommended structure
```
sentinel/
├── alpr/                 # Multi-frame consensus OCR voter & confusion tolerance
├── tracker/              # Road-snapped trajectory reconstruction & SQLite traces.db
├── anomaly/              # GNN congestion-aware anomaly scoring & telemetry bridge
├── intercept/            # Markov escape predictor & tactical guidance bridge
├── ingestion/            # Asynchronous event bus and camera grid injection
├── server.py             # FastAPI GIS live surveillance server with WebSockets
└── data/                 # SQLite storage (registry.db, traces.db) and audit.jsonl
```

### Core architectural pillars
1. **Multi-Frame OCR Voter:** Rolling window voting (`VOTE_WINDOW = 3`) with RapidFuzz token matching to resolve Indian license plate character confusion pairs (`0/D`, `1/I`, `8/B`, `5/S`).
2. **Road-Snapped Trajectory Reconstruction:** Polyline edge traversal (`RoadSnapper`) and kinematic plausibility monitoring ($v \le 30\text{ m/s}$) to detect sensor teleportation or cloned plates.
3. **GNN Congestion-Aware Anomaly Engine:** Cross-references route deviations with live traffic queue telemetry to distinguish rational rush-hour detours ($0.0$ anomaly) from suspicious evasions ($>0.65$ threat score).
4. **Tactical Intercept Orchestrator:** Progressive tactical containment stages (`METERING`, `CHOKE`, `FUNNEL`, `CONTAINMENT`) boxing in suspects via organic civilian queues, strictly governed by Emergency Vehicle Preemption (EVP) and pedestrian clearance safety envelopes.
5. **Cryptographic Audit Ledger:** Non-repudiable append-only logging with SHA-256 hash chaining ($H_i = \text{SHA256}(D_i \parallel H_{i-1})$).
