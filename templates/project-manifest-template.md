# Pinaka Project Manifest (`pinaka.json`) Template

> Every project joining Pinaka places a `pinaka.json` manifest in its repository root.
> This enables automatic or manual ingestion into Pinaka's portfolio registry (`data/projects.json`).

```json
{
  "$schema": "https://pinaka.dev/schemas/manifest.v1.json",
  "id": "project-slug",
  "name": "Project Name",
  "tagline": "A single compelling sentence describing the value proposition.",
  "category": "Campus Tech",
  "track": "community",
  "status": "prototype",
  "leadBuilder": "Builder Name (@github_handle)",
  "repoUrl": "https://github.com/username/project",
  "demoUrl": "https://project.example.com",
  "description": "2-3 paragraphs providing an in-depth summary of the problem, the architectural solution, and current user impact.",
  "techStack": [
    "Next.js",
    "PostgreSQL",
    "Docker"
  ],
  "highlights": [
    "Key architectural achievement or unique technical feature #1",
    "Performance, security, or concurrency guarantee #2",
    "Pilot validation or notable user metric #3"
  ],
  "gates": {
    "currentGate": 3,
    "lastEvaluated": "YYYY-MM-DD"
  }
}
```

### Valid Values Reference:

- **track**: `"flagship"` | `"incubating"` | `"community"` | `"research"`
- **status**: `"concept"` | `"prototype"` | `"mvp"` | `"pilot"` | `"live"` | `"paused"` | `"archived"`
- **category**: `"Campus Tech"` | `"GovTech"` | `"EdTech"` | `"AI / ML"` | `"FinTech"` | `"Open Source"` | `"Research"`
