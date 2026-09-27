const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DAYS = path.join(ROOT, 'days');

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const getPositionalArgs = () => {
  const pos = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      if (args[i] === '--force' || args[i] === '--all') {
        // boolean flag, do not advance
      } else {
        i++; // skip flag value
      }
    } else {
      pos.push(args[i]);
    }
  }
  return pos;
};

const existingDays = () =>
  fs.existsSync(DAYS)
    ? fs.readdirSync(DAYS).filter((d) => fs.existsSync(path.join(DAYS, d, 'set.json'))).sort()
    : [];

function generateExplanationTemplate(problem) {
  const platform = problem.platform || 'Codeforces';
  const template = problem.template || 'templates/codeforces.js';

  return `# ${problem.name} (${platform} ${problem.id})

## 1. Problem Overview
- **Platform:** ${platform}
- **Problem ID:** [${problem.id}](${problem.url})
- **Difficulty / Rating:** ${problem.rating}
- **Tags:** ${(problem.tags || []).join(', ') || 'N/A'}
- **Solution File:** \`${problem.file}.js\`
- **Starter Template:** \`${template}\`

---

## 2. Core Intuition & Mathematical Rationale
### Key Observations
1. **Mathematical Invariant:** Identify the quantity conserved or strictly monotonic across operations.
2. **Greedy vs DP Choice:** Explain why local optimal choices guarantee global optimality, or why subproblem overlapping requires memoization/DP.
3. **Optimality Trade-off:** Discuss why simpler brute-force approaches either succeed within constraints or require optimization.

\`\`\`mermaid
flowchart TD
    A[Start: Read Input Parameters] --> B{Check Base / Trivial Cases}
    B -- Degenerate/Base --> C[Direct O 1 Resolution]
    B -- Non-trivial --> D[Apply Core Algorithm Strategy]
    D --> E[Update State / Transitions]
    E --> F[Emit Verified Output Buffer]
\`\`\`

---

## 3. Visual Step-by-Step Walkthrough
### State Progression Matrix
Visualizing the transformation of state across iterations for a representative input:

\`\`\`mermaid
sequenceDiagram
    participant Input as Input Stream
    participant Engine as Algorithmic Engine
    participant State as State Tracker / DP Table
    participant Out as Output Buffer

    Input->>Engine: Stream Problem Instance
    Engine->>State: Initialize Invariants & Pointers
    loop Each Step / State Transition
        Engine->>State: Evaluate Feasibility & Optimal Pick
        State-->>Engine: Updated Invariant Value
    end
    Engine->>Out: Append Computed Result
\`\`\`

---

## 4. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N)$ or $O(1)$ | Each input element is visited a constant number of times. |
| **Space Complexity** | $O(1)$ auxiliary | Only scalar accumulator variables and input arrays are held in memory. |
| **Recursion Depth** | $O(1)$ | Iterative loop avoiding Node.js call stack limit (~10,000 frames). |

---

## 5. Edge Cases & Boundary Conditions
- **Minimum Bounds:** $N = 1$, minimal values, single-element configurations.
- **Maximum Bounds:** Extreme input bounds ($10^9$ or $\\sum N = 2\\cdot 10^5$).
- **Numeric Precision:** Plain JavaScript numbers are safe integers up to $2^{53} - 1 \\approx 9 \\times 10^{15}$.
- **Alternating / Degenerate:** Identical values, alternating parity, sorted vs reverse-sorted arrays.

---

## 6. Idiomatic Implementation
\`\`\`javascript
// Reference: solutions/${problem.file}.js
\`\`\`
`;
}

function main() {
  const days = existingDays();
  if (days.length === 0) {
    console.error('[explain] No practice days found in practice/days/');
    process.exit(1);
  }

  const date = flag('--date') || days[days.length - 1];
  const positionals = getPositionalArgs();
  const targetProblem = positionals[0] || null;

  const dayDir = path.join(DAYS, date);
  const setPath = path.join(dayDir, 'set.json');

  if (!fs.existsSync(setPath)) {
    console.error(`[explain] No set.json found for day: ${date}`);
    process.exit(1);
  }

  const set = JSON.parse(fs.readFileSync(setPath, 'utf-8'));
  const explanationsDir = path.join(dayDir, 'explanations');
  fs.mkdirSync(explanationsDir, { recursive: true });

  const problemsToExplain = targetProblem
    ? set.problems.filter((p) => p.file.toLowerCase() === targetProblem.toLowerCase() || p.id.toLowerCase() === targetProblem.toLowerCase())
    : set.problems;

  if (problemsToExplain.length === 0) {
    console.error(`[explain] Problem "${targetProblem}" not found in set for ${date}`);
    process.exit(1);
  }

  let generated = 0;
  for (const prob of problemsToExplain) {
    const docPath = path.join(explanationsDir, `${prob.file}.md`);
    if (!fs.existsSync(docPath) || args.includes('--force')) {
      fs.writeFileSync(docPath, generateExplanationTemplate(prob), 'utf-8');
      console.log(`  [explain] Created explanation doc: explanations/${prob.file}.md`);
      generated++;
    } else {
      console.log(`  [explain] Existing explanation doc found: explanations/${prob.file}.md (use --force to overwrite)`);
    }
  }

  console.log(`[explain] Finished. ${generated} explanation document(s) generated for ${date}.`);
}

main();
