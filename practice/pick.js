const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = __dirname;
const DAYS = path.join(ROOT, 'days');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'plan.json'), 'utf-8'));

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

const get = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'cp-practice' } }, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            if (json.status !== 'OK') return reject(new Error(json.comment || 'Codeforces API error'));
            resolve(json.result);
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });

const toFileName = (title) => {
  const words = title.replace(/\+/g, ' plus ').replace(/[^A-Za-z0-9 ]+/g, ' ').trim().split(/\s+/).filter(Boolean);
  const name = words.map((w, i) => (i === 0 ? w[0].toLowerCase() + w.slice(1) : w[0].toUpperCase() + w.slice(1))).join('');
  return /^[0-9]/.test(name) ? `p${name}` : name || 'problem';
};

const existingDays = () =>
  fs.existsSync(DAYS)
    ? fs.readdirSync(DAYS).filter((d) => fs.existsSync(path.join(DAYS, d, 'set.json'))).sort()
    : [];

const usedIds = (skip) => {
  const used = new Set();
  for (const d of existingDays().filter((x) => x !== skip)) {
    const set = JSON.parse(fs.readFileSync(path.join(DAYS, d, 'set.json'), 'utf-8'));
    set.problems.forEach((p) => used.add(p.id));
  }
  return used;
};

const targetsFor = (dayNumber) => {
  const week = Math.floor((dayNumber - 1) / 7);
  const base = Math.min(config.startRating + config.ratingStepPerWeek * week, config.maxRating);
  if (week === 0) return [{ rating: base, count: config.perDay }];
  const stretch = Math.min(config.stretchCount, config.perDay);
  return [
    { rating: base, count: config.perDay - stretch },
    { rating: Math.min(base + 100, config.maxRating), count: stretch },
  ];
};

const renderReadme = (set) => {
  const lines = [
    `# Day ${set.day} — ${set.date}`,
    '',
    `Target: ${set.targets.map((t) => `${t.count} × ${t.rating}`).join(', ')}`,
    '',
    'Solve each one yourself first. Create `<file>.js` at the repo root from `cp.js`, then check it:',
    '',
    '```',
    `node practice/verify ${set.date}`,
    '```',
    '',
    'Reference solutions are in `solutions/` — open them only after an honest attempt (30–45 min).',
    '',
    '| # | Done | Problem | Rating | Tags | File |',
    '|---|------|---------|--------|------|------|',
  ];
  set.problems.forEach((p, i) => {
    lines.push(`| ${i + 1} | [ ] | [${p.id} ${p.name}](${p.url}) | ${p.rating} | ${p.tags.join(', ')} | \`${p.file}.js\` |`);
  });
  return lines.join('\n') + '\n';
};

async function main() {
  const date = flag('--date') || today();
  const dir = path.join(DAYS, date);
  if (fs.existsSync(path.join(dir, 'set.json')) && !args.includes('--force')) {
    console.log(`[practice] Set for ${date} already exists: ${path.relative(process.cwd(), dir)}`);
    return;
  }

  const prior = existingDays().filter((d) => d < date);
  const dayNumber = prior.length + 1;
  const { problems, problemStatistics } = await get('https://codeforces.com/api/problemset.problems');
  const solvedCount = new Map(problemStatistics.map((s) => [`${s.contestId}${s.index}`, s.solvedCount]));

  const exclude = usedIds(date);
  if (config.handle) {
    const subs = await get(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(config.handle)}`);
    subs.filter((s) => s.verdict === 'OK').forEach((s) => exclude.add(`${s.problem.contestId}${s.problem.index}`));
  }
  const rootFiles = new Set(fs.readdirSync(path.join(ROOT, '..')).map((f) => f.replace(/\.js$/, '')));

  const pool = problems
    .filter((p) => p.type === 'PROGRAMMING' && p.rating)
    .map((p) => ({
      id: `${p.contestId}${p.index}`,
      name: p.name,
      rating: p.rating,
      tags: p.tags,
      url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`,
      file: toFileName(p.name),
      solved: solvedCount.get(`${p.contestId}${p.index}`) || 0,
    }))
    .filter((p) => !exclude.has(p.id) && !rootFiles.has(p.file));

  const targets = targetsFor(dayNumber);
  let chosen;
  const forced = flag('--ids');
  if (forced) {
    const byId = new Map(pool.map((p) => [p.id, p]));
    chosen = forced.split(',').map((id) => {
      const p = byId.get(id.trim());
      if (!p) throw new Error(`Problem ${id} not found or already used`);
      return p;
    });
  } else {
    chosen = [];
    for (const t of targets) {
      const candidates = pool
        .filter((p) => p.rating === t.rating && !chosen.includes(p))
        .sort((a, b) => b.solved - a.solved)
        .slice(0, config.poolSize);
      for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
      }
      chosen.push(...candidates.slice(0, t.count));
    }
  }

  const set = {
    date,
    day: dayNumber,
    targets,
    problems: chosen.map(({ solved, ...p }) => p),
  };
  fs.mkdirSync(path.join(dir, 'solutions'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'tests'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'set.json'), JSON.stringify(set, null, 2) + '\n');
  fs.writeFileSync(path.join(dir, 'README.md'), renderReadme(set));
  console.log(`[practice] Day ${dayNumber} (${date}): ${set.problems.length} problems`);
  set.problems.forEach((p) => console.log(`  ${p.id.padEnd(7)} ${String(p.rating).padEnd(5)} ${p.name}  ->  ${p.file}.js`));
}

main().catch((e) => {
  console.error(`[practice] ${e.message}`);
  process.exit(1);
});
