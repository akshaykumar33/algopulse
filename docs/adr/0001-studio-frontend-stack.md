# ADR-0001: Move AlgoPulse Studio's frontend to Vite + TypeScript + React, one piece at a time

Status: Proposed
Date: 2026-10-04

## Context

The studio frontend is about 9,000 lines of plain browser code: 10 classic scripts and two
stylesheets in `visualizer/public/` (app.js 2,049 lines, assistant.js 968, guide.js 1,006,
copilot.js 738, mascot.js 603, plus voice, ear, select and remote), served by a zero-dependency
Node server (`visualizer/server.js`, 402 lines) that also runs solutions and calls the AI.

Forces:

- **Shared globals.** The scripts share one global scope (`state`, `assistant`, `copilot`,
  `mascot`…) and reach into each other's DOM by id. Changing one piece safely means knowing
  all the others; two editing sessions have already overwritten each other's work twice.
- **No types, no build.** Mistakes such as a wrong field name or a missing icon weight only
  show up in the browser. There is no automated test in the repo for the UI; the end-to-end
  checks live in throwaway scripts.
- **Rich, stateful UI.** The buddy (emotions, moves, speech), the AI ear, captions, the
  gesture remote and the coach all react to shared state. That is what component frameworks
  are for.
- **Must keep working throughout.** It is used every day; a big-bang rewrite would leave it
  broken for days.
- **Constraints.** Runs locally on one modest Windows PC (memory is often tight), free tools
  only, a desktop app is planned, and AI assistants will keep editing the code, so popular,
  well-documented tools are worth more than novel ones.
- **What must not change:** the server's HTTP API (`/api/*`), the files on disk
  (`practice/days/...`), and the localStorage keys holding user settings.

## Options considered

1. **Vite + TypeScript + React (with Motion for animation)**
   - Pro: the most widely used stack, so docs, examples and AI help are best; Motion (the
     successor of Framer Motion) is the strongest web animation library, which suits the buddy;
     React islands can be mounted into the current page, so migration can be gradual; Vite
     builds feed straight into Tauri or Electron for the desktop app.
   - Con: a larger runtime (~45 KB gzipped) and more boilerplate than Svelte; effects and
     re-renders need discipline.
2. **Vite + TypeScript + Svelte 5**
   - Pro: smallest runtime, built-in transitions and stores, very little boilerplate; also
     supports gradual islands.
   - Con: smaller ecosystem, and fewer examples for the exact libraries we use (MediaPipe,
     Web Audio); less familiar to most contributors and AI tools.
3. **Next.js**
   - Rejected: server rendering and routing solve problems a single-user local app does not
     have, and Next's server would compete with ours, which must spawn Node processes and
     hold the AI keys. It also makes the desktop build harder.
4. **Stay vanilla, but add Vite, ES modules and TypeScript**
   - Pro: cheapest step; fixes globals and types.
   - Con: hand-written DOM updates stay, so the stateful UI keeps getting harder to change.
     This is Phase 1 of option 1 anyway, so it is not a dead end.

## Decision

Option 1: **Vite + TypeScript + React + Motion**, adopted incrementally, with the Node server
kept as the API (Vite proxies `/api` in development; the server serves the built `dist/`).
Chosen over Svelte for ecosystem and familiarity, which matter more here than bundle size
for a local app.

### Phases (each must keep the end-to-end UI test green before the next starts)

0. **Safety net.** Commit the end-to-end browser test as `npm run test:ui` (headless Chrome
   over the DevTools protocol, no new dependencies).
1. **Tooling, no behaviour change.** Add Vite + TypeScript in `visualizer/`; turn the scripts
   into ES modules with explicit imports instead of globals; the server serves the build.
2. **Islands.** Rebuild the self-contained pieces as React components mounted into the
   current page: gesture remote, live caption and spotlight, buddy (mascot), guide.
3. **Shell.** Header, sidebar, tabs and the problem views in React; retire `app.js`.
4. **Clean-up.** Remove the old scripts and unused CSS, and move styles into components.

## Consequences

- Easier: changing one piece without breaking another; catching mistakes before the
  browser; sharing state cleanly; animating the buddy; packaging the desktop app.
- Harder: a build step and `node_modules` for the frontend, so the visualizer is no longer
  zero-dependency (the server still is).
- Cost: roughly one to two weeks of focused work across the phases, during which other UI
  work should pause or go through the new structure, so changes are not made twice.
- Revisit if: the bundle or memory use becomes a problem on this PC (consider Svelte), or
  the studio needs to be hosted for many users (then reconsider server rendering).
