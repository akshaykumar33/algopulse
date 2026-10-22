# Daily Practice

Thirty multi-platform competitive programming problems a day across Codeforces, LeetCode, and CodeChef.

## Daily loop

1. At 12:00, the `CP Daily Practice` scheduled task runs `scripts/remind.ps1`. It builds today's set, shows a notification and opens `days/<date>/README.md`.
2. Solve each problem at the repo root or in `solutions/` as `<file>.js`, starting from the platform template.
3. Check your attempts against the tests:

   ```bash
   node src/cli/verify            # latest day (or: npm run verify)
   node src/cli/verify 2026-10-20 # a specific day
   node src/cli/verify --ref      # the reference solutions
   ```

4. Open `days/<date>/solutions/` only after an honest attempt.

## Architecture & Directory Structure

`practice/` is strictly reserved for curriculum problem data, daily mission sets, and progression roadmaps. All operational engines and tooling reside in `src/` and `apps/`.

```
practice/
├── plan.json              # Per-platform curriculum config & rating ramps
├── README.md              # Practice guide & documentation
├── ROADMAP.md             # Multi-week progression plan
└── days/<date>/           # Daily missions & test suites
    ├── README.md          # Daily checklist & problem links
    ├── set.json           # Daily problem set metadata
    ├── tests/             # Input/output test fixtures
    ├── solutions/         # Canonical reference solutions
    ├── attempts/          # Daily working attempts
    └── explanations/      # Intuitions & Mermaid diagrams
```

> **Note:**
> - CLI commands, Playwright submitter, AI agents, shared data store, and runner are located in [`src/`](file:///d:/pro/CP/src).
> - Web applications and visualizers are located in [`apps/`](file:///d:/pro/CP/apps).
