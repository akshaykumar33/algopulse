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

const LEVEL_MAP = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard',
};

async function fetchLeetCodeProblems({ usedIds, rootFiles, count = 10, difficulty = 'Easy', poolSize = 100 }) {
  const data = await fetchJson('https://leetcode.com/api/problems/algorithms/');
  const pairs = data.stat_status_pairs || [];
  const exclude = new Set(usedIds);

  const targetLevel = difficulty.toLowerCase() === 'easy' ? 1 : difficulty.toLowerCase() === 'hard' ? 3 : 2;

  const pool = pairs
    .filter((p) => !p.paid_only && !p.stat.question__hide && p.difficulty.level === targetLevel)
    .map((p) => {
      const id = `LC-${p.stat.frontend_question_id}`;
      const title = p.stat.question__title;
      return {
        platform: 'LeetCode',
        id,
        name: title,
        rating: LEVEL_MAP[p.difficulty.level] || 'Medium',
        tags: ['algorithms'],
        url: `https://leetcode.com/problems/${p.stat.question__title_slug}/`,
        file: toFileName(title),
        template: 'templates/leetcode.js',
        totalAcs: p.stat.total_acs || 0,
      };
    })
    .filter((p) => !exclude.has(p.id) && !rootFiles.has(p.file));

  // Sort by popularity (total accepted submissions) and sample randomly from top poolSize
  const candidates = pool.sort((a, b) => b.totalAcs - a.totalAcs).slice(0, poolSize);
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  return candidates.slice(0, count).map(({ totalAcs, ...rest }) => rest);
}

module.exports = {
  fetchLeetCodeProblems,
};
