/**
 * AlgoPulse Studio — local dashboard server for the daily practice sets.
 * Zero dependencies (Claude support lazily loads @anthropic-ai/sdk).
 * Binds to localhost only: it runs node processes, writes attempt files and spends
 * your AI key, so it must never be reachable from another machine or another origin.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const store = require('../practice/lib/store');
const ai = require('../practice/ai');
const prompts = require('../practice/ai/prompts');
const rag = require('../practice/ai/rag');

const { HttpError, REPO_ROOT, DAYS_DIR, readIf, toRepoRel } = store;
const PORT = Number(process.env.PORT) || 3333;
const HOST = '127.0.0.1';
const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_BODY = 2 * 1024 * 1024; // custom inputs can be large

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

/* ---------- http plumbing ---------- */

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': MIME['.json'], 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
}

// Requiring application/json forces a CORS preflight for any cross-origin page, which we
// never answer — so other websites cannot drive this server from the user's browser.
function readJsonBody(req) {
  if (!(req.headers['content-type'] || '').startsWith('application/json')) {
    return Promise.reject(new HttpError(415, 'Expected application/json'));
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY) {
        reject(new HttpError(413, 'Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new HttpError(400, 'Malformed JSON'));
      }
    });
  });
}

function serveStatic(pathname, res) {
  const rel = pathname === '/' ? 'index.html' : decodeURIComponent(pathname).replace(/^\/+/, '');
  let filePath = path.resolve(PUBLIC_DIR, rel);
  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  // Unknown extension-less paths fall back to the SPA shell; missing assets are a real 404.
  if (!fs.existsSync(filePath)) {
    if (path.extname(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
  });
  fs.createReadStream(filePath).pipe(res);
}

function requireAi() {
  if (!ai.isReady()) {
    throw new HttpError(400, 'No AI provider is set up yet. Open the Guide → "Choose your AI" to add a key or start Ollama.');
  }
}

const aiError = (label) => (err) => {
  throw err instanceof HttpError ? err : new HttpError(502, `${label}: ${err.message}`);
};

/* ---------- routes ---------- */

const routes = {
  'GET /api/days': () => ({
    days: store.listDays().map((date) => {
      const set = store.loadSet(date);
      return {
        date,
        day: set.day,
        problemCount: (set.problems || []).length,
        completed: store.completedFiles(path.join(DAYS_DIR, date)).size,
      };
    }),
    streak: store.streaks(),
    ai: ai.status(),
  }),

  'GET /api/day': (_req, url) => {
    const date = url.searchParams.get('date');
    const set = store.loadSet(date);
    const dayDir = path.join(DAYS_DIR, date);
    const done = store.completedFiles(dayDir);
    return {
      date: set.date,
      day: set.day,
      problems: (set.problems || []).map((p) => {
        const attempt = store.attemptPath(dayDir, p.file);
        const ref = store.referencePath(dayDir, p.file);
        const template = store.templateFor(p);
        return {
          ...p,
          platform: p.platform || 'Codeforces',
          done: done.has(p.file),
          explanation: readIf(path.join(dayDir, 'explanations', `${p.file}.md`)),
          reference: ref ? readIf(ref) : null,
          attempt: attempt ? { path: toRepoRel(attempt), code: readIf(attempt) } : null,
          template: template.code,
          templatePath: template.path,
          tests: store.loadTests(dayDir, p.file),
          story: store.loadStory(dayDir, p.file),
        };
      }),
    };
  },

  /* --- solving --- */

  // Create <file>.js at the repo root from the platform template. Never overwrites.
  'POST /api/attempt': async (req) => {
    const { date, file } = await readJsonBody(req);
    const { problem, dayDir } = store.findProblem(date, file);
    const existing = store.attemptPath(dayDir, file);
    if (existing) return { path: toRepoRel(existing), code: readIf(existing), created: false };
    const template = store.templateFor(problem);
    const header = `// ${problem.name} — ${problem.platform || 'Codeforces'} ${problem.id}\n// ${problem.url || ''}\n\n`;
    const target = path.join(REPO_ROOT, `${file}.js`);
    fs.writeFileSync(target, header + (template.code || "const fs = require('fs');\n"), { encoding: 'utf-8', flag: 'wx' });
    return { path: toRepoRel(target), code: readIf(target), created: true };
  },

  // Save the in-browser editor back to the problem's own attempt file.
  'POST /api/attempt/save': async (req) => {
    const { date, file, code } = await readJsonBody(req);
    if (typeof code !== 'string') throw new HttpError(400, 'Missing code');
    const { dayDir } = store.findProblem(date, file);
    const target = store.attemptPath(dayDir, file) || path.join(REPO_ROOT, `${file}.js`);
    fs.writeFileSync(target, code, 'utf-8');
    return { path: toRepoRel(target), savedAt: new Date().toISOString() };
  },

  'POST /api/run': async (req) => {
    const { date, file, source } = await readJsonBody(req);
    return store.runSamples(date, file, source);
  },

  'POST /api/run/custom': async (req) => {
    const { date, file, source, input, expected } = await readJsonBody(req);
    if (typeof input !== 'string') throw new HttpError(400, 'Missing input');
    return store.runCustom(date, file, source, input, expected);
  },

  'POST /api/verify': async (req) => {
    const { date } = await readJsonBody(req);
    store.loadSet(date); // validates the date before it reaches argv
    const { code, out } = await store.runScript(['practice/verify.js', date]);
    return { success: code === 0, output: out };
  },

  /* --- AI --- */

  'GET /api/ai/status': () => ai.status(),

  'POST /api/ai/provider': async (req) => {
    const { provider } = await readJsonBody(req);
    try {
      return ai.setProvider(provider);
    } catch (err) {
      throw new HttpError(400, err.message);
    }
  },

  // A tiny, uncached round trip so the Guide can prove the key works.
  'POST /api/ai/test': async () => {
    requireAi();
    const start = Date.now();
    const res = await ai
      .complete({ prompt: 'Reply with exactly: OK', maxTokens: 2000, cache: false })
      .catch(aiError('Connection test failed'));
    return { ok: /\bok\b/i.test(res.text), reply: res.text.trim().slice(0, 200), provider: res.provider, model: res.model, ms: Date.now() - start };
  },

  'POST /api/ai/cache/clear': () => ({ cache: ai.clearCache() }),

  'POST /api/ai/ask': async (req) => {
    const { date, file, question } = await readJsonBody(req);
    requireAi();
    if (typeof question !== 'string' || !question.trim()) throw new HttpError(400, 'Question is empty');
    const { problem, dayDir } = store.findProblem(date, file);
    return prompts.ask(problem, question.trim().slice(0, 4000), store.groundingFor(dayDir, problem)).catch(aiError('Coach'));
  },

  'POST /api/explain': async (req) => {
    const { date, file } = await readJsonBody(req);
    requireAi();
    const { problem, dayDir } = store.findProblem(date, file);
    const content = await prompts
      .generateExplanation(problem, store.groundingFor(dayDir, problem), { cache: false })
      .catch(aiError('Walkthrough generation failed'));
    const dir = path.join(dayDir, 'explanations');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${file}.md`), content, 'utf-8');
    return { explanation: content };
  },

  // Layman story + JSON trace, saved under practice/days/<date>/stories/.
  'POST /api/story': async (req) => {
    const { date, file } = await readJsonBody(req);
    requireAi();
    const { problem, dayDir } = store.findProblem(date, file);
    const story = await prompts
      .generateStory(problem, store.groundingFor(dayDir, problem), { cache: false })
      .catch(aiError('Story generation failed'));
    fs.mkdirSync(path.join(dayDir, 'stories'), { recursive: true });
    fs.writeFileSync(store.storyPath(dayDir, file), JSON.stringify(story, null, 2), 'utf-8');
    return { story };
  },

  // RAG search over your own notes (also exposed to Claude via the MCP server).
  'GET /api/search': (_req, url) => ({ results: rag.search(url.searchParams.get('q') || '', { k: 6 }) }),
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || HOST}`);
  const handler = routes[`${req.method} ${url.pathname}`];

  if (!handler) {
    if (url.pathname.startsWith('/api/')) return sendJson(res, 404, { error: 'Unknown endpoint' });
    if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed' });
    return serveStatic(url.pathname, res);
  }

  try {
    sendJson(res, 200, await handler(req, url));
  } catch (err) {
    const status = err.status || 500;
    if (status >= 500) console.error(`[server] ${req.method} ${url.pathname}:`, err.message);
    sendJson(res, status, { error: err.message });
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[server] Port ${PORT} is busy — the studio may already be running at http://localhost:${PORT}`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, HOST, () => {
  const s = ai.status();
  console.log(`\n  AlgoPulse Studio → http://localhost:${PORT}`);
  console.log(`  AI: ${s.active ? `${s.active.label} · ${s.active.model}${s.active.ready ? '' : ' (not ready)'}` : 'off — see the Guide in the app'}\n`);
});
