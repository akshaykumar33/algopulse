/**
 * Practice data layer — the single source of truth for reading day sets, attempts,
 * tests and stories, and for running solutions. Shared by the dashboard server
 * (visualizer/server.js) and the MCP server (practice/mcp/server.js) so the two can
 * never disagree about where a file lives or what "solved" means.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { computeProgress, problemLevel } = require('./progression');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DAYS_DIR = path.join(REPO_ROOT, 'practice', 'days');
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const RUN_TIMEOUT_MS = 10000;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const readIf = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : null);
const toRepoRel = (p) => path.relative(REPO_ROOT, p).split(path.sep).join('/');

function listDays() {
  if (!fs.existsSync(DAYS_DIR)) return [];
  return fs
    .readdirSync(DAYS_DIR)
    .filter((d) => DATE_RE.test(d) && fs.existsSync(path.join(DAYS_DIR, d, 'set.json')))
    .sort()
    .reverse();
}

function loadSet(date) {
  if (!DATE_RE.test(date || '')) throw new HttpError(400, 'Invalid date');
  const setPath = path.join(DAYS_DIR, date, 'set.json');
  if (!fs.existsSync(setPath)) throw new HttpError(404, `No practice set for ${date}`);
  return JSON.parse(fs.readFileSync(setPath, 'utf-8'));
}

// Looks the problem up in set.json, so a caller can never name an arbitrary file.
function findProblem(date, file) {
  const set = loadSet(date);
  const problem = (set.problems || []).find((p) => p.file === file);
  if (!problem) throw new HttpError(404, `Problem "${file}" is not in the ${date} set`);
  return { set, problem, dayDir: path.join(DAYS_DIR, date) };
}

// verify.js ticks "[ ]" -> "[x]" in the day README; that is the source of truth for "done".
function completedFiles(dayDir) {
  const readme = readIf(path.join(dayDir, 'README.md'));
  const done = new Set();
  if (!readme) return done;
  for (const line of readme.split(/\r?\n/)) {
    const m = line.match(/\[x\].*?`([A-Za-z0-9_]+)\.js`/i);
    if (m) done.add(m[1]);
  }
  return done;
}

// Same search order as practice/verify.js so the dashboard, MCP and CLI agree.
function attemptPath(dayDir, file) {
  const candidates = [
    path.join(dayDir, 'attempts', `${file}.js`),
    path.join(REPO_ROOT, 'solutions', `${file}.js`),
    path.join(REPO_ROOT, `${file}.js`),
  ];
  return candidates.find((c) => fs.existsSync(c)) || null;
}

function referencePath(dayDir, file) {
  const p = path.join(dayDir, 'solutions', `${file}.js`);
  return fs.existsSync(p) ? p : null;
}

function loadTests(dayDir, file) {
  const raw = readIf(path.join(dayDir, 'tests', `${file}.json`));
  return raw ? JSON.parse(raw) : [];
}

function templateFor(problem) {
  const rel = problem.template || `templates/${(problem.platform || 'codeforces').toLowerCase()}.js`;
  for (const candidate of [rel, 'cp.js']) {
    const code = readIf(path.join(REPO_ROOT, candidate));
    if (code) return { path: candidate, code };
  }
  return { path: null, code: null };
}

const storyPath = (dayDir, file) => path.join(dayDir, 'stories', `${file}.json`);

function loadStory(dayDir, file) {
  const raw = readIf(storyPath(dayDir, file));
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// What an AI provider is allowed to see: the verified reference and the samples.
function groundingFor(dayDir, problem) {
  const ref = referencePath(dayDir, problem.file);
  return { solution: ref ? readIf(ref) : null, tests: loadTests(dayDir, problem.file) };
}

// The learner's local calendar date, YYYY-MM-DD.
function localToday() {
  const d = new Date();
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/**
 * XP, level, rank, quests, achievements and streak, derived from verified solves
 * (the [x] marks verify.js writes). A solve counts on the day of its set.
 */
function progress() {
  const solved = [];
  const setSizes = {};
  for (const date of listDays()) {
    const set = loadSet(date);
    const done = completedFiles(path.join(DAYS_DIR, date));
    setSizes[date] = (set.problems || []).length;
    for (const p of set.problems || []) {
      if (done.has(p.file)) solved.push({ date, platform: (p.platform || 'codeforces').toLowerCase(), level: problemLevel(p) });
    }
  }
  return computeProgress({ solved, setSizes, languages: solved.length ? ['javascript'] : [], today: localToday() });
}

function streaks() {
  const p = progress();
  return { current: p.streak, best: p.bestStreak, solvedToday: p.solvedToday > 0 };
}

/* ---------- running solutions ---------- */

const normalize = (s) =>
  String(s || '').trim().split(/\r?\n/).map((l) => l.trim().split(/\s+/).join(' ')).join('\n');

function runNode(file, input) {
  return new Promise((resolve) => {
    const start = process.hrtime.bigint();
    const child = spawn(process.execPath, [file], { cwd: REPO_ROOT });
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, RUN_TIMEOUT_MS);
    child.stdout.on('data', (c) => (stdout += c));
    child.stderr.on('data', (c) => (stderr += c));
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr, timedOut, ms: Number(process.hrtime.bigint() - start) / 1e6 });
    });
    child.stdin.on('error', () => {}); // program may exit before reading all input
    child.stdin.end(input);
  });
}

function runScript(args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, args, { cwd: REPO_ROOT });
    let out = '';
    child.stdout.on('data', (c) => (out += c));
    child.stderr.on('data', (c) => (out += c));
    child.on('close', (code) => resolve({ code, out }));
  });
}

function solutionFor(dayDir, file, source) {
  const target = source === 'reference' ? referencePath(dayDir, file) : attemptPath(dayDir, file);
  if (!target) {
    throw new HttpError(404, source === 'reference'
      ? `No reference solution for ${file}`
      : `No attempt yet — create ${file}.js at the repo root`);
  }
  return target;
}

// Judge a solution against every sample test of a problem.
async function runSamples(date, file, source) {
  const { dayDir } = findProblem(date, file);
  const target = solutionFor(dayDir, file, source);
  const results = [];
  for (const t of loadTests(dayDir, file)) {
    const r = await runNode(target, t.input);
    const passed = !r.timedOut && r.code === 0 && normalize(r.stdout) === normalize(t.output);
    const verdict = passed ? 'AC' : r.timedOut ? 'TLE' : r.code !== 0 ? 'RE' : 'WA';
    results.push({ verdict, ms: Math.round(r.ms), stdout: r.stdout, stderr: r.stderr.slice(0, 2000) });
  }
  return { file: toRepoRel(target), results };
}

// Run one custom input; with an expected output it is judged like a sample.
async function runCustom(date, file, source, input, expected) {
  const { dayDir } = findProblem(date, file);
  const target = solutionFor(dayDir, file, source);
  const r = await runNode(target, input.endsWith('\n') ? input : `${input}\n`);
  const hasExpected = typeof expected === 'string' && expected.trim() !== '';
  let verdict = r.timedOut ? 'TLE' : r.code !== 0 ? 'RE' : 'OK';
  if (verdict === 'OK' && hasExpected) verdict = normalize(r.stdout) === normalize(expected) ? 'AC' : 'WA';
  return { file: toRepoRel(target), verdict, ms: Math.round(r.ms), stdout: r.stdout, stderr: r.stderr.slice(0, 4000) };
}

module.exports = {
  REPO_ROOT,
  DAYS_DIR,
  DATE_RE,
  HttpError,
  readIf,
  toRepoRel,
  listDays,
  loadSet,
  findProblem,
  completedFiles,
  attemptPath,
  referencePath,
  loadTests,
  templateFor,
  storyPath,
  loadStory,
  groundingFor,
  progress,
  streaks,
  localToday,
  normalize,
  runNode,
  runScript,
  runSamples,
  runCustom,
};
