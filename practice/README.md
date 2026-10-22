# Daily Practice

Thirty multi-platform competitive programming problems a day across Codeforces, LeetCode, and CodeChef.

## Daily loop

1. At 12:00, the `CP Daily Practice` scheduled task runs `practice/scripts/remind.ps1`. It builds today's set, shows a notification and opens `days/<date>/README.md`.
2. Solve each problem at the repo root or in `solutions/` as `<file>.js`, starting from the platform template.
3. Check your attempts against the tests:

   ```bash
   node practice/cli/verify            # latest day (or: npm run verify)
   node practice/cli/verify 2026-10-20 # a specific day
   node practice/cli/verify --ref      # the reference solutions
   ```

4. Open `days/<date>/solutions/` only after an honest attempt.

## Architecture & Directory Structure

```
practice/
├── plan.json              # Per-platform curriculum config & rating ramps
├── README.md              # Practice guide & documentation
├── ROADMAP.md             # Multi-week progression plan
├── cli/                   # Operational CLI commands
│   ├── pick.js            # Picks daily problems from APIs (CF, LC, CC)
│   ├── verify.js          # Verifies solutions against tests
│   ├── solve.js           # Automated solving & scaffolding engine
│   ├── explain.js         # Generates diagrams & explanation docs
│   ├── ship.js            # Git commit, PR, and auto-merge pipeline
│   ├── auto.js            # Full autonomous curriculum & submission loop
│   ├── monitor.js         # Interactive live submission dashboard & stream
│   ├── knowledge.js       # Living knowledge base auditor & synchronizer
│   └── syncVerdicts.js    # Verdict synchronization utility
├── lib/                   # Internal algorithmic helpers, shared libraries & providers
│   ├── providers/         # Platform curriculum fetchers (CF, LC, CC)
│   ├── progression.js     # Platform progression & curriculum math
│   ├── ramp.js            # Difficulty ramp calculators
│   ├── store.js           # State persistence layer
│   ├── visualizer.js      # Mermaid flowchart & sequence generator
│   └── injection.js       # Prompt injection defenses
├── playwright/            # Browser automation & platform submission workers
│   ├── submit.js          # Unified submission engine via Chrome CDP
│   ├── auth.js            # Session & credentials manager
│   ├── browser.js         # Playwright Chrome launcher & CDP connector
│   └── sanitize.js        # Automated code sanitizer & comment stripper
├── days/<date>/           # Daily missions & test suites
│   ├── README.md          # Daily checklist & problem links
│   ├── set.json           # Daily problem set metadata
│   ├── tests/             # Input/output test fixtures
│   ├── solutions/         # Canonical reference solutions
│   ├── attempts/          # Daily working attempts
│   └── explanations/      # Intuitions & Mermaid diagrams
└── ai/                    # Autonomous AI agents & providers
```
