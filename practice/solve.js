/**
 * Automated Daily Practice Problem Solver
 * Generates reference solutions and sample test fixtures using the active AI provider,
 * and validates each solution before saving.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const ai = require('./ai');

const ROOT = __dirname;
const DAYS = path.join(ROOT, 'days');
const REPO = path.join(ROOT, '..');
const ROOT_SOLUTIONS = path.join(REPO, 'solutions');

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const normalize = (s) => String(s || '').trim().split(/\r?\n/).map((l) => l.trim().split(/\s+/).join(' ')).join('\n');

const existingDays = () =>
  fs.existsSync(DAYS)
    ? fs.readdirSync(DAYS).filter((d) => fs.existsSync(path.join(DAYS, d, 'set.json'))).sort()
    : [];

function runCode(code, input) {
  // Ensure require.main === module is true when executing via node -e
  const runner = `require.main = module;\n${code}`;
  return spawnSync('node', ['-e', runner], {
    input,
    encoding: 'utf-8',
    timeout: 8000,
    maxBuffer: 32 * 1024 * 1024,
  });
}


function extractJson(text) {
  let cleaned = text.trim();
  const match = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match) cleaned = match[1].trim();
  return JSON.parse(cleaned);
}

function buildPrompt(problem) {
  const isLc = (problem.platform || '').toLowerCase() === 'leetcode';
  const isCc = (problem.platform || '').toLowerCase() === 'codechef';
  const isCf = (problem.platform || '').toLowerCase() === 'codeforces';

  let formatInstructions = '';
  if (isLc) {
    formatInstructions = `Platform is LeetCode:
- Write the core solution function (e.g. \`var solve = function(...) { ... };\`).
- If inputs can be trees, include a TreeNode definition and helper \`if (Array.isArray(root)) root = buildTree(root);\`.
- Wrap in the standard local runner:
\`\`\`javascript
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\\r?\\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
\`\`\`
- Tests format: 'input' must be JSON-serialized string lines matching standard LeetCode input, 'output' must be JSON-serialized strings (e.g. "true\\nfalse\\n" or "1\\n4\\n").`;
  } else {
    formatInstructions = `Platform is ${isCc ? 'CodeChef' : 'Codeforces'}:
- Read all standard input synchronously via \`fs.readFileSync(0, 'utf-8').trim().split(/\\r?\\n/)\`.
- Handle multi-test case loops (\`t\`) if the problem specifies multiple test cases.
- Buffer output into an array and flush with \`console.log(out.join('\\n'))\`.
- Tests format: 'input' must be exact raw multiline stdin ending with newline, 'output' must be exact expected stdout ending with newline.`;
  }

  return `You are a World Finals Competitive Programming Champion in JavaScript (Node.js).
Write an optimal, bug-free reference solution and verified sample test fixtures for this problem.

Problem Details:
- Platform: ${problem.platform}
- ID: ${problem.id}
- Name: ${problem.name}
- Rating / Difficulty: ${problem.rating}
- Tags: ${(problem.tags || []).join(', ') || 'N/A'}
- URL: ${problem.url}

Implementation Guidelines:
${formatInstructions}
- STRICT RULE: ABSOLUTELY NO COMMENTS (no '//', no '/* */', no JSDoc) in the solution code. Pure logic only.
- STRICT NAMING: Use standard, concise, natural competitive programming variable names ('n', 'm', 'k', 'ans', 'res', 'cnt', 'freq', 'adj', 'vis', 'dp', 'arr', 'nums', 'val', 'cur', 'sum', 'solve'). Strictly NO filler variables, watermarks (e.g. 'ballast', 'mexoramax'), or verbose enterprise names.
- Zero AI signatures or watermarks. The code must look 100% like authentic human-written competitive programming code.
- Use plain JS Number where safe integers (< 9e15) suffice; only use BigInt if numbers exceed 9e15.
- Fast, clean, optimal time and space complexity.
- Return ONLY valid JSON in this exact structure:
{
  "solution": "<JavaScript code as a string>",
  "tests": [
    {
      "input": "<raw input string>",
      "output": "<raw expected output string>"
    }
  ]
}`;
}

async function solveProblem(problem, dayDir, force = false) {
  const daySolutionsDir = path.join(dayDir, 'solutions');
  const dayTestsDir = path.join(dayDir, 'tests');
  const solPath = path.join(daySolutionsDir, `${problem.file}.js`);
  const testPath = path.join(dayTestsDir, `${problem.file}.json`);
  const rootSolPath = path.join(ROOT_SOLUTIONS, `${problem.file}.js`);

  if (!force && fs.existsSync(solPath) && fs.existsSync(testPath)) {
    return { status: 'skipped', problem: problem.file };
  }

  const prompt = buildPrompt(problem);
  let attempts = 0;
  let rateLimitPauses = 0;
  const maxAttempts = 3;
  let lastError = null;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await ai.complete({
        system: 'You are an expert competitive programming solver producing JSON output with solution and sample tests.',
        prompt: attempts === 1 ? prompt : `${prompt}\n\nPREVIOUS ATTEMPT FAILED:\n${lastError}\nPlease correct the logic and provide valid matching solution and tests.`,
        cache: attempts === 1 && !force,
      });

      const parsed = extractJson(response.text);
      if (!parsed.solution || !Array.isArray(parsed.tests) || parsed.tests.length === 0) {
        throw new Error('Missing "solution" or "tests" array in AI response');
      }

      // Validate generated solution against generated tests
      let allPassed = true;
      for (const [idx, t] of parsed.tests.entries()) {
        const r = runCode(parsed.solution, t.input);
        if (r.status !== 0 || normalize(r.stdout) !== normalize(t.output)) {
          allPassed = false;
          lastError = `Test ${idx + 1} failed. Status: ${r.status}, Error: ${r.stderr || 'Wrong Answer'}, Expected: ${JSON.stringify(t.output)}, Got: ${JSON.stringify(r.stdout)}`;
          break;
        }
      }

      if (allPassed) {
        fs.mkdirSync(daySolutionsDir, { recursive: true });
        fs.mkdirSync(dayTestsDir, { recursive: true });
        fs.mkdirSync(ROOT_SOLUTIONS, { recursive: true });

        fs.writeFileSync(solPath, parsed.solution.trim() + '\n', 'utf-8');
        fs.writeFileSync(rootSolPath, parsed.solution.trim() + '\n', 'utf-8');
        fs.writeFileSync(testPath, JSON.stringify(parsed.tests, null, 2) + '\n', 'utf-8');

        return { status: 'solved', problem: problem.file, attempts };
      }
    } catch (err) {
      lastError = err.message;
      if (/quota exceeded|rate-limit|resource_exhausted|429|too many requests|retry in/i.test(err.message)) {
        rateLimitPauses++;
        if (rateLimitPauses <= 2) {
          const waitMatch = err.message.match(/retry in ([\d\.]+)s/i);
          const waitSec = waitMatch ? Math.ceil(parseFloat(waitMatch[1])) + 3 : 25;
          process.stdout.write(`(rate-limited, waiting ${waitSec}s) ... `);
          await new Promise((r) => setTimeout(r, waitSec * 1000));
          attempts--; // Don't count rate-limit pauses against code logic attempts
        }
      }
    }
  }


  return { status: 'failed', problem: problem.file, error: lastError };

}

async function main() {
  const days = existingDays();
  if (days.length === 0) {
    console.error('[solve] No practice days found in practice/days/');
    process.exit(1);
  }

  const date = flag('--date') || days[days.length - 1];
  const force = args.includes('--force');
  const filterPlatform = flag('--platform');
  const dayDir = path.join(DAYS, date);
  const setPath = path.join(dayDir, 'set.json');

  if (!fs.existsSync(setPath)) {
    console.error(`[solve] No set.json found for day ${date}`);
    process.exit(1);
  }

  const set = JSON.parse(fs.readFileSync(setPath, 'utf-8'));
  const problems = filterPlatform
    ? set.problems.filter((p) => (p.platform || '').toLowerCase() === filterPlatform.toLowerCase())
    : set.problems;

  console.log(`[solve] Processing Day ${set.day} (${date}) [${problems.length} problems] ...`);

  let solved = 0;
  let skipped = 0;
  let failed = 0;

  for (const prob of problems) {
    process.stdout.write(`  · [${prob.platform}] ${prob.file} ... `);
    const res = await solveProblem(prob, dayDir, force);
    if (res.status === 'solved') {
      console.log(`✓ solved (attempt ${res.attempts})`);
      solved++;
      await new Promise((r) => setTimeout(r, 1500));
    } else if (res.status === 'skipped') {
      console.log(`- already solved`);
      skipped++;
    } else {
      console.log(`✗ failed (${res.error})`);
      failed++;
    }
  }

  console.log(`\n[solve] Summary for ${date}: ${solved} newly solved, ${skipped} skipped, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(`[solve] Fatal error: ${err.message}`);
  process.exit(1);
});
