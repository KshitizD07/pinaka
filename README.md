# PINAKA

> **A sovereign home for ambitious ideas, promising projects, and emerging ventures.**  
> Curated with editorial rigor, grounded in working software, and connected through collaborative builder squads.

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Ecosystem](https://img.shields.io/badge/Pinaka-Foundry-EA580C?style=flat-square)](https://github.com/KshitizD07/pinaka)
[![Collaboration](https://img.shields.io/badge/Squads-SkillSphere-6366F1?style=flat-square)](https://skill-sphere-v1.vercel.app/)

---

## 🏹 What is Pinaka?

**Pinaka** is an independent project studio and curated builder ecosystem. It addresses a fundamental flaw in student and open-source innovation: **brilliant technical work dies in isolated GitHub repositories** without discovery, structured peer review, or cross-functional team formation.

Pinaka bridges this gap by acting as:
1. **A Discovery Ledger:** An editorial portfolio celebrating verified technical work across deployed production systems, active prototypes, deeptech breakthroughs, and early proposals.
2. **A Squad Collaboration Bridge:** An organic integration with [SkillSphere](https://skill-sphere-v1.vercel.app/) where any ongoing work or proposed project links directly to a collaborative squad, allowing builders and specialists to join forces.
3. **An Engineering Standard:** A rigorous engineering handbook and gate review framework ensuring projects maintain production-grade standards from day one.

---

## 🏛️ Ecosystem Portfolio Ledger

Every venture in Pinaka is classified under one of four distinct portfolio tracks:

| Category | Description | Stage Focus |
|---|---|---|
| **Featured** | Deployed, tested, and actively operating production systems with verified user feedback. | `live` / `pilot` |
| **Ongoing Work** | Active projects with running prototypes, functioning MVPs, and open squad positions. | `prototype` / `mvp` |
| **Breakthroughs** | Advanced AI architectures, multi-agent simulations, and deep scientific/hardware research. | `prototype` / `research` |
| **Proposals** | Early problem briefs, architectural proposals, and suggested initiatives seeking collaborators. | `concept` / `proposal` |

### Active Systems in the Ledger

```
pinaka/
├── SkillSphere         [Featured · Deployed]       AI Proof-of-Work & Squad Matching Engine
├── Opendoor           [Ongoing Work · Prototype]  Cryptographic University Hostel OS
├── Intelli-Light 3.0  [Breakthroughs · AI/MARL]   Spatio-Temporal MARL Adaptive Traffic Grid
└── Sentinel           [Breakthroughs · Defense]   City-Wide ANPR Trajectory & Tactical Intercept
```

* **[SkillSphere](https://skill-sphere-v1.vercel.app/)** (`flagship` · `live`):
  * **Lead:** `KSHITIZ`
  * **Architecture:** React 19, Vite, Node.js, Express, Prisma, PostgreSQL, Google Gemini AI, Socket.io.
  * **Key Innovations:** Google Gemini-powered GitHub multi-stack repository verification, Antifragile N.E.X.U.S. multi-strategy consensus matching engine, and skill-gated squads with automated lifecycle maintenance.
  * **Collaboration:** [Join Squad on SkillSphere](https://skill-sphere-v1.vercel.app/)

* **Opendoor** (`incubating` · `prototype`):
  * **Team:** `KSHITIZ`, `HARSHIT SINGH`, `HARSH KASAUNDHAN`, `ARYAN GUPTA`
  * **Architecture:** Node.js, PostgreSQL, Next.js, Socket.io, Argon2id + TOTP 2FA.
  * **Key Innovations:** Cryptographic offline-ready QR-JWT gate passes, concurrency-safe soft-lock bed allocation, and real-time attendance telemetry.
  * **Collaboration:** [Join Squad on SkillSphere](https://skill-sphere-v1.vercel.app/)

* **Intelli-Light 3.0** (`breakthroughs` · `prototype`):
  * **Team:** `N.O.V.A`
  * **Architecture:** PyTorch, Stable-Baselines3, SUMO, TraCI, Graph Attention Networks (GAT+LSTM), FastAPI, WebSockets, Three.js.
  * **Key Innovations:** Topology-agnostic Spatio-Temporal MARL coordinating chaotic multi-intersection grids (3-way, 4-way, 5-way) with exponential anti-starvation reward engineering and deterministic NTCIP 1202 SNMP hardware failsafes.
  * **Repository:** [KshitizD07/Intelli_Light](https://github.com/KshitizD07/Intelli_Light.git)

* **Sentinel** (`breakthroughs` · `prototype`):
  * **Team:** `N.O.V.A`
  * **Architecture:** Python, FastAPI, WebSockets, Leaflet, SUMO, TraCI, RapidFuzz, SQLite, YOLOv8, PaddleOCR.
  * **Key Innovations:** Multi-frame OCR consensus voter with Indian plate confusion pair tolerance (`0/D`, `1/I`, `8/B`), kinematic plausibility monitoring ($v \le 30\text{ m/s}$), GNN congestion-aware anomaly scoring, and tactical traffic intercept orchestration with emergency vehicle preemption (EVP).
  * **Repository:** [KshitizD07/Intelli_Light](https://github.com/KshitizD07/Intelli_Light.git)

---

## 🛠️ The SkillSphere Collaboration Loop

A core principle of Pinaka is **active collaboration over passive showcase**:
1. When a builder submits an idea under **Proposals** or **Ongoing Work**, they provide their **SkillSphere Squad URL**.
2. Pinaka displays a prominent **"Collaborate on SkillSphere"** action button alongside the project row.
3. Visitors, students, and engineers can click the button, view the active squad roadmap, and submit an application to join the team with their verified SkillSphere profile.

---

## 📚 Technical Documentation Pack

Pinaka maintains a standardized engineering operating system. Every product accepted into the studio adheres to these conventions:

| Guide | Chapter Title & Scope |
|---|---|
| [**00-README.md**](00-README.md) | Technical Documentation Pack Overview & Golden Rules |
| [**01-engineering-handbook.md**](01-engineering-handbook.md) | Shared engineering baseline: repos, code review, testing, docs, infra |
| [**02-git-workflow.md**](02-git-workflow.md) | Branching model, commit conventions (`add:`, `update:`, `fix:`), PR workflow |
| [**03-pr-review-checklist.md**](03-pr-review-checklist.md) | Mandatory PR template and 4-eyes code review checklist |
| [**04-testing-strategy.md**](04-testing-strategy.md) | Test pyramid per product archetype, coverage standards, and quality gates |
| [**05-cicd-and-deployment.md**](05-cicd-and-deployment.md) | CI/CD workflows, environments, zero-downtime deployment runbook |
| [**06-security-and-secrets.md**](06-security-and-secrets.md) | Secrets handling, dependency auditing, access control, and GDPR/privacy |
| [**07-repo-standards-and-templates.md**](07-repo-standards-and-templates.md) | Standard repository layout, `README.md` and `CONTRIBUTING.md` templates |
| [**08-lifecycle-gates.md**](08-lifecycle-gates.md) | 5-stage lifecycle gates: Problem Discovery $\to$ Validation $\to$ Prototype $\to$ Pilot $\to$ Decision |
| [**09-product-tech-notes.md**](09-product-tech-notes.md) | Technical architecture notes for SkillSphere, Intelli-Light, and Sentinel |
| [**10-metrics-and-observability.md**](10-metrics-and-observability.md) | Telemetry instrumentation, product metrics, engineering health, and logging |
| [**11-90-day-technical-checklist.md**](11-90-day-technical-checklist.md) | Execution checklist mapped across 30 / 60 / 90 day milestones |
| [**templates/**](templates/) | Ready-to-use templates: problem brief, ADR, case study, contributor agreement |

---

## 📋 The `pinaka.json` Standard

For repository ingestion, projects can place a `pinaka.json` manifest at their repository root:

```json
{
  "$schema": "https://pinaka.dev/schemas/manifest.v1.json",
  "id": "project-slug",
  "name": "Project Name",
  "tagline": "A single compelling sentence describing the system.",
  "track": "incubating",
  "status": "prototype",
  "leadBuilder": "Lead Builder or Team Name",
  "squadUrl": "https://skill-sphere-v1.vercel.app/squads/your-squad-id",
  "skillSphereUrl": "https://skill-sphere-v1.vercel.app/profile/your-uuid",
  "skillSphereLabel": "Your Name",
  "repoUrl": "https://github.com/username/project",
  "demoUrl": "https://project.example.com",
  "techStack": ["Next.js", "Node.js", "PostgreSQL"],
  "highlights": [
    "Key architectural achievement or unique technical feature #1",
    "Performance, security, or concurrency guarantee #2",
    "Evidence of progress, test feedback, or milestone #3"
  ]
}
```

---

## 💻 Portal Architecture & Local Setup

The Pinaka portal is built on Next.js 14 App Router, Tailwind CSS, Lucide icons, and serverless Node.js APIs.

### Directory Structure

```
pinaka/
├── data/
│   ├── projects.json          # Source-of-truth portfolio ledger
│   └── submissions.json       # Intake queue for candidate evaluations
├── portal/                    # Next.js 14 App Router web application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.jsx       # Public portal with editorial ledger
│   │   │   ├── onboard/       # Builder submission & curation guide
│   │   │   ├── admin/         # Studio Lead control room & ledger promotion
│   │   │   └── api/           # Submissions, admin auth, Git ingestion APIs
│   │   ├── components/        # Ledger row, badges, buttons, layout
│   │   └── lib/               # Constants, tracks, and mailer logic
│   ├── public/                # Static assets, fonts, icons
│   └── package.json           # Dependencies and build scripts
└── README.md                  # Master documentation
```

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KshitizD07/pinaka.git
   cd pinaka
   ```

2. **Install dependencies:**
   ```bash
   npm --prefix portal install
   ```

3. **Configure Environment Variables (Optional):**
   Create `portal/.env.local` to enable Git-backed auto-commit and SMTP notifications:
   ```env
   # Control Room Passphrase
   PINAKA_ADMIN_PASSPHRASE=your-studio-passphrase

   # Optional GitHub API promotion
   GITHUB_TOKEN=ghp_your_token_here
   GITHUB_REPOSITORY=KshitizD07/pinaka

   # Optional SMTP Notifications
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ADMIN_NOTIFICATION_EMAIL=your-email@gmail.com
   ```

4. **Run the local development server:**
   ```bash
   npm --prefix portal run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the live portal.

5. **Build for production:**
   ```bash
   npm --prefix portal run build
   npm --prefix portal start
   ```

---

## 🔒 Creator Rights & Guarantees

* **100% Creator Ownership:** Showcasing or submitting work to Pinaka never transfers intellectual property, code rights, or repository ownership to Pinaka.
* **Evidence Over Decks:** Projects earn their place on the ledger through working code, reproducible simulations, or verified user feedback—not speculative pitch decks.
* **No Lock-in:** Builders are free to archive, migrate, or commercialize their products independently at any time.

---

## 📜 Commit Conventions

Pinaka follows standard git commit conventions:
* `add:` New features, project entries, or documentation
* `update:` Enhancements, styling adjustments, or data refinements
* `fix:` Bug fixes, route patches, or regression resolutions
* `refactor:` Code restructuring without functional changes

---

## 👥 Studio Leadership & Credits

* **Studio Lead:** **KSHITIZ** ([GitHub](https://github.com/KshitizD07) · [SkillSphere Profile](https://skill-sphere-v1.vercel.app/profile/867968a4-119a-44a9-8eae-df7faa0cdc60))
* **Intelli-Light & Sentinel Engineering:** **N.O.V.A**
* **Opendoor Engineering:** **Kshitiz**, **Harshit Singh**, **Harsh Kasaundhan**, **Aryan Gupta**
