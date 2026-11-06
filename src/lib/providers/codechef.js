const https = require('https');
const { toFileName } = require('./codeforces');

const fetchJson = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });

async function fetchCodeChefProblems({ usedIds, rootFiles, count = 10, startRating = 800, endRating = 1200, poolSize = 100 }) {
  const exclude = new Set(usedIds);
  const rootSet = rootFiles instanceof Set ? rootFiles : new Set(rootFiles || []);
  const pool = [];
  const maxPages = 10;

  for (let page = 0; page < maxPages; page++) {
    const url = `https://www.codechef.com/api/list/problems?page=${page}&limit=50&sort_by=difficulty_rating&sort_order=asc&start_rating=${startRating}&end_rating=${endRating}`;
    try {
      const json = await fetchJson(url);
      const items = json.data || [];
      if (!items.length) break;

      for (const p of items) {
        const rating = parseInt(p.difficulty_rating, 10);
        if (rating <= 0) continue;
        const id = `CC-${p.code}`;
        const file = toFileName(p.name);
        if (exclude.has(id) || rootSet.has(file)) continue;

        pool.push({
          platform: 'CodeChef',
          id,
          name: p.name,
          rating,
          tags: ['codechef'],
          url: `https://www.codechef.com/problems/${p.code}`,
          file,
          template: 'templates/codechef.js',
          submissions: parseInt(p.successful_submissions, 10) || 0,
        });
      }

      if (pool.length >= poolSize) break;
    } catch {
      break;
    }
  }

  const candidates = pool.sort((a, b) => b.submissions - a.submissions).slice(0, poolSize);
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  const verified = [];
  for (const cand of candidates) {
    if (verified.length >= count) break;
    const pCode = cand.id.replace(/^CC-/, '');
    try {
      const details = await fetchJson(`https://www.codechef.com/api/contests/PRACTICE/problems/${pCode}`);
      if (details.body) {
        const stripped = details.body
          .replace(/This is an example statement in markdown[\s\S]*?help@codechef\.com\./i, '')
          .replace(/example problem statement/gi, '')
          .trim();
        if (stripped.length < 50) {
          console.warn(`[codechef-provider] Skipping ${cand.id} (${cand.name}) - placeholder template statement.`);
          continue;
        }
      }
      const langs = details.languages_supported || '';
      if (langs && !/NODEJS/i.test(langs)) {
        console.warn(`[codechef-provider] Skipping ${cand.id} (${cand.name}) - does not support Node.js (${langs}).`);
        continue;
      }
    } catch {}
    verified.push(cand);
  }

  return verified.map(({ submissions, ...rest }) => rest);
}

module.exports = {
  fetchCodeChefProblems,
};
