const https = require('https');

const fetchJson = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'cp-practice-runner' } }, (res) => {
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

async function fetchCodeforcesProblems({ handle, usedIds, rootFiles, targets, poolSize = 200 }) {
  const { problems, problemStatistics } = await fetchJson('https://codeforces.com/api/problemset.problems');
  const solvedCount = new Map(problemStatistics.map((s) => [`${s.contestId}${s.index}`, s.solvedCount]));

  const exclude = new Set(usedIds);
  if (handle) {
    try {
      const subs = await fetchJson(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}`);
      subs.filter((s) => s.verdict === 'OK').forEach((s) => exclude.add(`${s.problem.contestId}${s.problem.index}`));
    } catch (err) {
      console.warn(`[codeforces] Warning: Could not fetch user submissions for handle "${handle}": ${err.message}`);
    }
  }

  const pool = problems
    .filter((p) => p.type === 'PROGRAMMING' && p.rating)
    .map((p) => {
      const id = `${p.contestId}${p.index}`;
      return {
        platform: 'Codeforces',
        id,
        name: p.name,
        rating: p.rating,
        tags: p.tags || [],
        url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`,
        file: toFileName(p.name),
        template: 'templates/codeforces.js',
        solved: solvedCount.get(id) || 0,
      };
    })
    .filter((p) => !exclude.has(p.id) && !rootFiles.has(p.file));

  const chosen = [];
  for (const t of targets) {
    const candidates = pool
      .filter((p) => p.rating === t.rating && !chosen.some((c) => c.id === p.id))
      .sort((a, b) => b.solved - a.solved)
      .slice(0, poolSize);

    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    chosen.push(...candidates.slice(0, t.count).map(({ solved, ...rest }) => rest));
  }

  return chosen;
}

module.exports = {
  fetchCodeforcesProblems,
  toFileName,
};
