# Strict Segregation: Practice vs. Contests

## 1. Directory Purpose & Separation
- **`practice/` (Strictly for Daily Curriculum Practice):**
  - All daily curriculum problems, test suites, and explanations belong **EXCLUSIVELY** here:
    - Solutions: `practice/days/<YYYY-MM-DD>/solutions/<problemName>.js`
    - Tests: `practice/days/<YYYY-MM-DD>/tests/<problemName>.json`
    - Explanations: `practice/days/<YYYY-MM-DD>/explanations/<problemName>.md`
  - Manifests: `practice/days/<YYYY-MM-DD>/set.json`
- **`contests/` (Strictly for Official / Real Contests):**
  - Reserved **ONLY** for official contest rounds (live or virtual), organized by platform and contest identifier:
    - Codeforces: `contests/codeforces/<roundName>/<problemName>.js` (e.g. `contests/codeforces/round990/problemA.js`)
    - LeetCode: `contests/leetcode/<contestName>/<problemName>.js` (e.g. `contests/leetcode/weekly420/problem1.js`)
    - CodeChef: `contests/codechef/<startersName>/<problemName>.js` (e.g. `contests/codechef/starters150/problemA.js`)
  - **NEVER** place daily curriculum or practice problems into `contests/`.
  - **NEVER** mirror practice solutions into `contests/<platform>/<date>/`.

## 2. Platform Submissions Engine
- Automated platform submissions (`npm run submit` / `src/playwright/submit.js`) read directly from `practice/days/<date>/solutions/`.
- The engine does not require or read from `contests/`.

## 3. Pull Request Guidelines
- Never raise PRs adding daily practice files into `contests/`.
- Any legacy practice mirrors inside `contests/` must be excised.
