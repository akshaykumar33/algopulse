const fs = require('fs');
const path = require('path');
const { fetchCodeforcesProblems, toFileName } = require('../lib/providers/codeforces');
const { fetchLeetCodeProblems } = require('../lib/providers/leetcode');
const { fetchCodeChefProblems } = require('../lib/providers/codechef');
const { rampStatus } = require('../lib/store');

const REPO = path.resolve(__dirname, '..', '..');
const ROOT = path.join(REPO, 'practice');
const DAYS = path.join(ROOT, 'days');
const planPath = path.join(ROOT, 'plan.json');
const config = JSON.parse(fs.readFileSync(planPath, 'utf-8'));

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const today = () => {
  const d = new Date();
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const existingDays = () =>
  fs.existsSync(DAYS)
    ? fs.readdirSync(DAYS).filter((d) => fs.existsSync(path.join(DAYS, d, 'set.json'))).sort()
    : [];

const usedIds = (skip) => {
  const used = new Set();
  for (const d of existingDays().filter((x) => x !== skip)) {
    const set = JSON.parse(fs.readFileSync(path.join(DAYS, d, 'set.json'), 'utf-8'));
    (set.problems || []).forEach((p) => used.add(p.id));
  }
  return used;
};

const targetsFor = (dayNumber, cfConfig) => {
  const week = Math.floor((dayNumber - 1) / 7);
  const base = Math.min(cfConfig.startRating + cfConfig.ratingStepPerWeek * week, cfConfig.maxRating);
  const perDay = cfConfig.perDay || 33;
  if (week === 0) return [{ rating: base, count: perDay }];
  const stretch = Math.min(cfConfig.stretchCount || 8, perDay);
  return [
    { rating: base, count: perDay - stretch },
    { rating: Math.min(base + 100, cfConfig.maxRating), count: stretch },
  ];
};

const renderReadme = (set) => {
  const lines = [
    `# Day ${set.day} — ${set.date}`,
    '',
    `**Curriculum Platforms:** ${set.platforms.join(', ')}`,
    `**Total Problems:** ${set.problems.length}`,
    '',
    'Solve each problem at the repo root starting from the designated template, then run the verifier:',
    '',
    '```bash',
    `node src/cli/verify ${set.date}`,
    '```',
    '',
    'Reference solutions are in `solutions/`. Detailed intuitions and Mermaid diagrams are in `explanations/`.',
    '',
    '| # | Platform | Done | Problem | Rating / Difficulty | Solution File | Template | Explanations & Diagrams |',
    '|---|:---:|:---:|---|:---:|---|---|:---:|',
  ];

  set.problems.forEach((p, i) => {
    const platformBadge = `\`${p.platform}\``;
    const docLink = `[View Docs & Diagrams](explanations/${p.file}.md)`;
    lines.push(
      `| ${i + 1} | ${platformBadge} | [ ] | [${p.id} — ${p.name}](${p.url}) | ${p.rating} | \`${p.file}.js\` | \`${p.template}\` | ${docLink} |`
    );
  });

  return lines.join('\n') + '\n';
};

function generateExplanationDoc(problem) {
  return `# ${problem.name} (${problem.platform} ${problem.id})

## 1. Problem Overview
- **Platform:** ${problem.platform}
- **Problem ID:** [${problem.id}](${problem.url})
- **Difficulty / Rating:** ${problem.rating}
- **Tags:** ${(problem.tags || []).join(', ') || 'N/A'}
- **Solution File:** \`${problem.file}.js\`
- **Starter Template:** \`${problem.template}\`

---

## 2. Core Intuition & Mathematical Rationale
### Key Observations
1. **Mathematical Invariant:** Identify the quantity conserved or strictly monotonic across operations.
2. **Algorithmic Strategy:** Why greedy choice property holds, or why dynamic programming / two-pointers is optimal.
3. **Optimality Trade-off:** Explain why alternative approaches (e.g. pure brute force) exceed time or memory limits.

\`\`\`mermaid
flowchart TD
    A[Start: Stream Input Instance] --> B{Validate Base Cases}
    B -- Degenerate Case --> C[Direct O 1 Resolution]
    B -- General Case --> D[Execute Primary Algorithm Strategy]
    D --> E[Update State & Invariant Tracking]
    E --> F[Output Verified Optimal Result]
\`\`\`

---

## 3. Visual Step-by-Step Walkthrough
### State Progression Matrix
Tracing state transitions on a representative sample input:

\`\`\`mermaid
sequenceDiagram
    participant In as Input Data
    participant Engine as Algorithmic Engine
    participant State as State Tracker / Invariant
    participant Out as Output Buffer

    In->>Engine: Send Input Stream
    Engine->>State: Initialize Boundary Pointers / Accumulators
    loop Transition Steps
        Engine->>State: Evaluate Feasibility & Optimal Pick
        State-->>Engine: Updated Invariant Value
    end
    Engine->>Out: Append Result
\`\`\`

---

## 4. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N)$ or $O(1)$ | Each element is processed in constant time per step. |
| **Space Complexity** | $O(1)$ auxiliary | No unnecessary memory allocated within the execution loop. |
| **Recursion Depth** | $O(1)$ | Fully iterative loop avoiding stack overflow. |

---

## 5. Edge Cases & Boundary Conditions
- **Minimum bounds:** Single elements, zero-values, minimal constraints.
- **Maximum bounds:** Large scale arrays ($N = 2 \\cdot 10^5$), large values ($10^9$).
- **Numeric safety:** Plain JS safe integers up to $2^{53}-1 \\approx 9 \\times 10^{15}$.

---

## 6. Idiomatic Implementation
\`\`\`javascript
// Reference: solutions/${problem.file}.js
\`\`\`
`;
}

async function main() {
  const date = flag('--date') || today();
  const dir = path.join(DAYS, date);

  if (fs.existsSync(path.join(dir, 'set.json')) && !args.includes('--force')) {
    console.log(`[practice] Set for ${date} already exists: ${path.relative(process.cwd(), dir)} (use --force to re-generate)`);
    return;
  }

  const prior = existingDays().filter((d) => d < date);
  const dayNumber = prior.length + 1;
  const exclude = usedIds(date);
  const rootFiles = new Set(fs.readdirSync(REPO).map((f) => f.replace(/\.js$/, '')));

  const selectedPlatform = flag('--platform') || config.defaultPlatform || 'all';
  const customCount = flag('--count') ? parseInt(flag('--count'), 10) : null;

  const platformsToRun =
    selectedPlatform === 'all'
      ? ['codeforces', 'leetcode', 'codechef']
      : [selectedPlatform.toLowerCase()];

  console.log(`[practice] Generating Day ${dayNumber} (${date}) problem set for platforms: ${platformsToRun.join(', ')} ...`);

  // Adaptive difficulty (plan.json "adaptive": false restores the fixed weekly ramp).
  const adaptive = config.adaptive !== false ? rampStatus() : null;
  if (adaptive) {
    for (const [plat, r] of Object.entries(adaptive)) {
      console.log(`[practice] ${plat}: ${r.decision} → ${plat === 'leetcode' ? r.difficulty : r.rating} (${r.reason})`);
    }
  }

  const chosen = [];
  const platformsIncluded = [];

  for (const plat of platformsToRun) {
    if (plat === 'codeforces') {
      const cfConfig = config.platforms?.codeforces || {
        startRating: 800,
        ratingStepPerWeek: 100,
        maxRating: 1600,
        perDay: customCount || config.perPlatformCount || 33,
        stretchCount: 8,
      };
      if (customCount) cfConfig.perDay = customCount;
      const targets = adaptive
        ? (() => {
            const base = adaptive.codeforces.rating;
            const perDay = cfConfig.perDay || 33;
            const stretch = Math.min(cfConfig.stretchCount || 8, perDay);
            const top = Math.min(base + 100, cfConfig.maxRating || 3500);
            return top > base ? [{ rating: base, count: perDay - stretch }, { rating: top, count: stretch }] : [{ rating: base, count: perDay }];
          })()
        : targetsFor(dayNumber, cfConfig);
      console.log(`[practice] Fetching Codeforces target: ${targets.map((t) => `${t.count}x${t.rating}`).join(', ')} ...`);
      const cfProblems = await fetchCodeforcesProblems({
        handle: config.handle,
        usedIds: exclude,
        rootFiles,
        targets,
        poolSize: config.poolSize || 350,
      });
      chosen.push(...cfProblems);
      platformsIncluded.push('Codeforces');
    } else if (plat === 'leetcode') {
      const lcConfig = config.platforms?.leetcode || {
        perDay: customCount || config.perPlatformCount || 33,
        difficulty: 'Easy',
      };
      const count = customCount || lcConfig.perDay || 33;
      if (adaptive) lcConfig.difficulty = adaptive.leetcode.difficulty;
      console.log(`[practice] Fetching LeetCode ${count} problems (${lcConfig.difficulty}) ...`);
      const lcProblems = await fetchLeetCodeProblems({
        usedIds: exclude,
        rootFiles,
        count,
        difficulty: lcConfig.difficulty || 'Easy',
        poolSize: config.poolSize || 200,
      });
      chosen.push(...lcProblems);
      platformsIncluded.push('LeetCode');
    } else if (plat === 'codechef') {
      const ccConfig = config.platforms?.codechef || {
        perDay: customCount || config.perPlatformCount || 33,
        startRating: 800,
        endRating: 1200,
      };
      const count = customCount || ccConfig.perDay || 33;
      const startRating = adaptive ? adaptive.codechef.rating : ccConfig.startRating || 800;
      const endRating = adaptive ? startRating + 200 : ccConfig.endRating || ccConfig.maxRating || 1200;
      console.log(`[practice] Fetching CodeChef ${count} problems (${startRating}-${endRating}) ...`);
      const ccProblems = await fetchCodeChefProblems({
        usedIds: exclude,
        rootFiles,
        count,
        startRating,
        endRating,
        poolSize: config.poolSize || 200,
      });
      chosen.push(...ccProblems);
      platformsIncluded.push('CodeChef');
    } else {
      console.warn(`[practice] Unknown platform "${plat}". Skipping.`);
    }
  }

  const solutionsDir = path.join(dir, 'solutions');
  const testsDir = path.join(dir, 'tests');
  const explanationsDir = path.join(dir, 'explanations');

  fs.mkdirSync(solutionsDir, { recursive: true });
  fs.mkdirSync(testsDir, { recursive: true });
  fs.mkdirSync(explanationsDir, { recursive: true });

  const set = {
    date,
    day: dayNumber,
    platforms: platformsIncluded,
    problems: chosen,
  };

  fs.writeFileSync(path.join(dir, 'set.json'), JSON.stringify(set, null, 2) + '\n');
  fs.writeFileSync(path.join(dir, 'README.md'), renderReadme(set));

  // Generate explanation templates for any problem that doesn't have one
  let createdDocs = 0;
  for (const prob of chosen) {
    const docPath = path.join(explanationsDir, `${prob.file}.md`);
    if (!fs.existsSync(docPath)) {
      fs.writeFileSync(docPath, generateExplanationDoc(prob), 'utf-8');
      createdDocs++;
    }
  }

  console.log(`[practice] Successfully generated set for ${date}:`);
  console.log(`  - Total problems: ${set.problems.length}`);
  console.log(`  - Platforms: ${platformsIncluded.join(', ')}`);
  console.log(`  - Explanation docs created: ${createdDocs}`);
  console.log(`  - Manifest: ${path.relative(process.cwd(), path.join(dir, 'set.json'))}`);
  console.log(`  - Checklist: ${path.relative(process.cwd(), path.join(dir, 'README.md'))}`);
}

main().catch((err) => {
  console.error(`[practice] Error: ${err.message}`);
  process.exit(1);
});
