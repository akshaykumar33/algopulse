const fs = require('fs');
const path = require('path');
const { detectParadigm, generateParadigmFlowchart, generateSequenceWalkthrough } = require('../lib/visualizer');
const ai = require('../ai');
const { generateExplanation } = require('../ai/prompts');

const ROOT = path.resolve(__dirname, '..');
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
      if (args[i] === '--force' || args[i] === '--all' || args[i] === '--ai' || args[i] === '--offline') {
        // boolean flags
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

// Reference solution + sample tests, so the AI explains the real problem instead of guessing it.
function loadGrounding(dayDir, problem) {
  const readIf = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : null);
  const solution =
    readIf(path.join(dayDir, 'solutions', `${problem.file}.js`)) ||
    readIf(path.join(ROOT, '..', 'solutions', `${problem.file}.js`));
  const testsRaw = readIf(path.join(dayDir, 'tests', `${problem.file}.json`));
  return { solution, tests: testsRaw ? JSON.parse(testsRaw) : [] };
}

function generateNativeExplanation(problem) {
  const platform = problem.platform || 'Codeforces';
  const template = problem.template || 'templates/codeforces.js';
  const tags = problem.tags || [];
  const paradigm = detectParadigm(tags, problem.name);
  const flowchart = generateParadigmFlowchart(paradigm, problem);
  const sequenceDiagram = generateSequenceWalkthrough(paradigm, problem);

  return `# ${problem.name} (${platform} ${problem.id})

## 1. Problem Overview
- **Platform:** ${platform}
- **Problem ID:** [${problem.id}](${problem.url})
- **Difficulty / Rating:** ${problem.rating}
- **Algorithmic Paradigm:** \`${paradigm}\`
- **Tags:** ${tags.join(', ') || 'N/A'}
- **Solution File:** \`solutions/${problem.file}.js\`
- **Starter Template:** \`${template}\`

---

## 2. Core Intuition & Mathematical Rationale
### Key Observations
1. **Mathematical Invariant:** Identify the quantity conserved or strictly monotonic across operations.
2. **Strategy (${paradigm}):** Evaluate how the algorithm guarantees optimality without exploring the full exponential search space.
3. **Optimality Trade-off:** Naive brute force would exceed constraints; the ${paradigm} approach reduces complexity to feasible bounds.

${flowchart}

---

## 3. Visual Step-by-Step Walkthrough
### State Progression Matrix
Tracing state transitions on a representative sample input:

${sequenceDiagram}

---

## 4. Algorithmic Complexity

| Dimension | Bound | Proof & Rationale |
|---|:---:|---|
| **Time Complexity** | $O(N)$ or $O(\\log N)$ | Paradigm (${paradigm}) processes inputs within standard CP time limits ($< 1.0$s). |
| **Space Complexity** | $O(1)$ or $O(N)$ auxiliary | Memory footprint fits within typical 256MB/512MB limits. |
| **Recursion Depth** | $O(1)$ | Iterative loop avoids Node.js call stack limit (~10,000 frames). |

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

async function main() {
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

  const provider = ai.activeProvider();
  const useAi = ai.isReady() && !args.includes('--offline');
  console.log(`[explain] Generating explanations for Day ${set.day} (${date}) [Mode: ${useAi ? `AI: ${provider.label} (${provider.getModel()})` : 'Native Visualizer'}] ...`);

  let generated = 0;
  for (const prob of problemsToExplain) {
    const docPath = path.join(explanationsDir, `${prob.file}.md`);
    if (!fs.existsSync(docPath) || args.includes('--force')) {
      let content = null;
      if (useAi) {
        console.log(`  [explain] Asking the AI for a grounded walkthrough: ${prob.name} (${prob.id}) ...`);
        try {
          content = await generateExplanation(prob, loadGrounding(dayDir, prob));
        } catch (err) {
          console.warn(`  [explain] AI generation failed (${err.message}); using the offline template.`);
        }
      }

      if (!content) {
        content = generateNativeExplanation(prob);
      }

      fs.writeFileSync(docPath, content, 'utf-8');
      console.log(`  [explain] Created explanation doc: explanations/${prob.file}.md`);
      generated++;
    } else {
      console.log(`  [explain] Existing explanation doc found: explanations/${prob.file}.md (use --force to overwrite)`);
    }
  }

  console.log(`[explain] Finished. ${generated} explanation document(s) generated for ${date}.`);
}

main().catch((err) => {
  console.error(`[explain] Error: ${err.message}`);
  process.exit(1);
});
