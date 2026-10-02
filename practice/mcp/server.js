#!/usr/bin/env node
/**
 * AlgoPulse MCP server — exposes your practice data to any MCP client (Claude Code,
 * Claude Desktop, …) as tools. Zero dependencies: newline-delimited JSON-RPC 2.0 over
 * stdio. stdout carries protocol messages only; logs go to stderr.
 *
 * Claude Code picks it up from .mcp.json at the repo root. Claude Desktop:
 *   { "mcpServers": { "algopulse": { "command": "node", "args": ["<repo>/practice/mcp/server.js"] } } }
 */

const readline = require('readline');
const path = require('path');
const store = require('../lib/store');
const rag = require('../ai/rag');

const SERVER_INFO = { name: 'algopulse', version: '1.0.0' };
const SUPPORTED_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05'];

const dateProp = { type: 'string', description: 'Practice day, YYYY-MM-DD (from list_days)' };
const fileProp = { type: 'string', description: 'Problem file name in camelCase, e.g. "onlyPluses" (from list_days)' };
const sourceProp = { type: 'string', enum: ['attempt', 'reference'], description: 'Run the student attempt (default) or the reference solution' };

const TOOLS = [
  {
    name: 'list_days',
    description: 'List practice days with each problem (file, id, name, rating, tags, solved?) and the current solving streak.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    run() {
      return {
        streak: store.streaks(),
        days: store.listDays().map((date) => {
          const set = store.loadSet(date);
          const done = store.completedFiles(path.join(store.DAYS_DIR, date));
          return {
            date,
            day: set.day,
            problems: (set.problems || []).map((p) => ({ file: p.file, id: p.id, name: p.name, rating: p.rating, tags: p.tags, url: p.url, solved: done.has(p.file) })),
          };
        }),
      };
    },
  },
  {
    name: 'get_problem',
    description: "Get a problem's walkthrough, story, sample tests and the student's attempt. The reference solution is only included when include_reference is true — avoid spoilers unless the student asks.",
    inputSchema: {
      type: 'object',
      properties: { date: dateProp, file: fileProp, include_reference: { type: 'boolean', description: 'Include the reference solution (spoiler)' } },
      required: ['date', 'file'],
      additionalProperties: false,
    },
    run({ date, file, include_reference: includeRef = false }) {
      const { problem, dayDir } = store.findProblem(date, file);
      // Fetching the reference counts as a reveal, exactly like the studio's Reveal button.
      if (includeRef && store.referencePath(dayDir, file)) store.reveal(dayDir, file);
      const attempt = store.attemptPath(dayDir, file);
      const ref = store.referencePath(dayDir, file);
      return {
        ...problem,
        solved: store.completedFiles(dayDir).has(file),
        tests: store.loadTests(dayDir, file),
        explanation: store.readIf(path.join(dayDir, 'explanations', `${file}.md`)),
        story: store.loadStory(dayDir, file),
        attempt: attempt ? { path: store.toRepoRel(attempt), code: store.readIf(attempt) } : null,
        reference: includeRef && ref ? store.readIf(ref) : includeRef ? null : '(hidden — pass include_reference: true)',
        statement: store.loadStatement(dayDir, file),
      };
    },
  },
  {
    name: 'run_tests',
    description: "Run the student's attempt (or the reference) against every sample test. Returns AC/WA/RE/TLE per test with output and timing.",
    inputSchema: { type: 'object', properties: { date: dateProp, file: fileProp, source: sourceProp }, required: ['date', 'file'], additionalProperties: false },
    run({ date, file, source = 'attempt' }) {
      return store.runSamples(date, file, source);
    },
  },
  {
    name: 'run_custom',
    description: 'Run the attempt (or reference) on a custom input. With expected_output the result is judged AC/WA.',
    inputSchema: {
      type: 'object',
      properties: { date: dateProp, file: fileProp, source: sourceProp, input: { type: 'string' }, expected_output: { type: 'string' } },
      required: ['date', 'file', 'input'],
      additionalProperties: false,
    },
    run({ date, file, source = 'attempt', input, expected_output: expected }) {
      return store.runCustom(date, file, source, input, expected);
    },
  },
  {
    name: 'search_notes',
    description: "BM25 search over the student's own explanations, stories and reference solutions across all days. Use it to find similar problems they have already met.",
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string' }, k: { type: 'integer', description: 'Number of passages (default 5)' } },
      required: ['query'],
      additionalProperties: false,
    },
    run({ query, k = 5 }) {
      return { results: rag.search(query, { k: Math.min(Math.max(1, k), 15) }) };
    },
  },
];

/* ---------- JSON-RPC over stdio ---------- */

const send = (msg) => process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', ...msg })}\n`);
const reply = (id, result) => send({ id, result });
const fail = (id, code, message) => send({ id, error: { code, message } });

async function handle(msg) {
  const { id, method, params = {} } = msg;
  const isNotification = id === undefined || id === null;

  switch (method) {
    case 'initialize':
      return reply(id, {
        protocolVersion: SUPPORTED_VERSIONS.includes(params.protocolVersion) ? params.protocolVersion : SUPPORTED_VERSIONS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: 'Competitive-programming practice data for this repo. Start with list_days. Prefer hints over spoilers: only fetch reference solutions when the student asks.',
      });
    case 'ping':
      return reply(id, {});
    case 'tools/list':
      return reply(id, { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) });
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === params.name);
      if (!tool) return fail(id, -32602, `Unknown tool: ${params.name}`);
      try {
        const result = await tool.run(params.arguments || {});
        return reply(id, { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] });
      } catch (err) {
        // Tool failures are results the model can read and recover from, not protocol errors.
        return reply(id, { content: [{ type: 'text', text: `Error: ${err.message}` }], isError: true });
      }
    }
    default:
      if (!isNotification) fail(id, -32601, `Method not found: ${method}`);
  }
}

const pending = new Set();
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
  if (!line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return send({ id: null, error: { code: -32700, message: 'Parse error' } });
  }
  const job = handle(msg)
    .catch((err) => {
      process.stderr.write(`[algopulse-mcp] ${err.stack || err}\n`);
      if (msg.id !== undefined) fail(msg.id, -32603, err.message);
    })
    .finally(() => pending.delete(job));
  pending.add(job);
});
// Finish in-flight tool calls (test runs take a moment) before exiting on EOF.
rl.on('close', () => Promise.allSettled([...pending]).then(() => process.exit(0)));
