/**
 * Retrieval over your own practice history (RAG) — zero dependencies.
 * Chunks every day's explanations (by ## section), stories and reference solutions,
 * scores them with BM25, and returns the best passages from OTHER problems so the coach
 * can say "this is like X you solved on day 2". The current problem is excluded: it is
 * already in the prompt as verified grounding.
 */

const fs = require('fs');
const path = require('path');
const { DAYS_DIR, listDays, loadSet } = require('../lib/store');

const STOP = new Set('the a an and or of to in is it for on with as by be this that are we our you your if then than at from can each one two into its not use using so all any'.split(' '));
const tokenize = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9+#]+/g, ' ')
    .split(' ')
    .filter((w) => w.length > 1 && !STOP.has(w));

let cached = null;
let builtAt = 0;

function chunksFor(date, problem) {
  const dir = path.join(DAYS_DIR, date);
  const label = `${problem.name} (${problem.id}, day ${date})`;
  const out = [];
  const md = path.join(dir, 'explanations', `${problem.file}.md`);
  if (fs.existsSync(md)) {
    const text = fs.readFileSync(md, 'utf-8');
    // Offline placeholder docs carry no knowledge; skip them.
    if (!/Identify the quantity conserved or strictly monotonic/.test(text)) {
      for (const section of text.split(/\n(?=## )/)) {
        const title = (section.match(/^##?\s+(.*)/) || [])[1] || 'Overview';
        out.push({ kind: 'explanation', title: `${label} — ${title}`, text: section.slice(0, 2400) });
      }
    }
  }
  const story = path.join(dir, 'stories', `${problem.file}.json`);
  if (fs.existsSync(story)) {
    try {
      const s = JSON.parse(fs.readFileSync(story, 'utf-8'));
      out.push({ kind: 'story', title: `${label} — story`, text: `${s.keyIdea}\n${s.story}`.slice(0, 2400) });
    } catch { /* ignore malformed */ }
  }
  const sol = path.join(dir, 'solutions', `${problem.file}.js`);
  if (fs.existsSync(sol)) {
    out.push({ kind: 'solution', title: `${label} — reference solution`, text: fs.readFileSync(sol, 'utf-8').slice(0, 2400) });
  }
  const tags = (problem.tags || []).join(' ');
  return out.map((c) => ({ ...c, file: problem.file, date, tokens: tokenize(`${c.title} ${tags} ${c.text}`) }));
}

function buildIndex() {
  if (cached && Date.now() - builtAt < 30000) return cached;
  const docs = [];
  for (const date of listDays()) {
    for (const p of loadSet(date).problems || []) docs.push(...chunksFor(date, p));
  }
  const df = new Map();
  for (const d of docs) for (const t of new Set(d.tokens)) df.set(t, (df.get(t) || 0) + 1);
  const avgLen = docs.reduce((n, d) => n + d.tokens.length, 0) / Math.max(1, docs.length);
  cached = { docs, df, avgLen };
  builtAt = Date.now();
  return cached;
}

// minScore filters weak, tag-only matches: on this corpus unrelated problems sharing a
// tag like "greedy" score ~3, while genuinely related passages score 5+.
function search(query, { k = 3, excludeFile = null, minScore = 0 } = {}) {
  const { docs, df, avgLen } = buildIndex();
  const q = [...new Set(tokenize(query))];
  const N = docs.length;
  const K1 = 1.4;
  const B = 0.75;
  return docs
    .filter((d) => d.file !== excludeFile)
    .map((d) => {
      const tf = new Map();
      for (const t of d.tokens) tf.set(t, (tf.get(t) || 0) + 1);
      let score = 0;
      for (const t of q) {
        const f = tf.get(t);
        if (!f) continue;
        const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
        score += idf * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * d.tokens.length) / avgLen)));
      }
      return { score, doc: d };
    })
    .filter((r) => r.score > Math.max(0, minScore))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(({ score, doc }) => ({ score: Math.round(score * 100) / 100, kind: doc.kind, title: doc.title, date: doc.date, file: doc.file, text: doc.text }));
}

module.exports = { search, tokenize };
