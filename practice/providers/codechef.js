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
  const url = `https://www.codechef.com/api/list/problems?page=0&limit=50&sort_by=difficulty_rating&sort_order=asc&start_rating=${startRating}&end_rating=${endRating}`;
  const json = await fetchJson(url);
  const items = json.data || [];
  const exclude = new Set(usedIds);

  const pool = items
    .filter((p) => parseInt(p.difficulty_rating, 10) > 0)
    .map((p) => {
      const id = `CC-${p.code}`;
      return {
        platform: 'CodeChef',
        id,
        name: p.name,
        rating: parseInt(p.difficulty_rating, 10),
        tags: ['codechef'],
        url: `https://www.codechef.com/problems/${p.code}`,
        file: toFileName(p.name),
        template: 'templates/codechef.js',
        submissions: parseInt(p.successful_submissions, 10) || 0,
      };
    })
    .filter((p) => !exclude.has(p.id) && !rootFiles.has(p.file));

  const candidates = pool.sort((a, b) => b.submissions - a.submissions).slice(0, poolSize);
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  return candidates.slice(0, count).map(({ submissions, ...rest }) => rest);
}

module.exports = {
  fetchCodeChefProblems,
};
