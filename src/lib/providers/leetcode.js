const https = require('https');
const fs = require('fs');
const path = require('path');
const { toFileName } = require('./codeforces');

async function fetchLeetCodeGraphQL({ difficulty = 'Medium', limit = 100, skip = 0 }) {
  let cookieStr = '';
  const authPath = path.resolve(__dirname, '../../..', '.auth', 'leetcode.json');
  if (fs.existsSync(authPath)) {
    try {
      const auth = JSON.parse(fs.readFileSync(authPath, 'utf8'));
      cookieStr = (auth.cookies || []).map((c) => c.name + '=' + c.value).join('; ');
    } catch {}
  }

  const query = `query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(
      categorySlug: $categorySlug
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      total: totalNum
      questions: data {
        frontendQuestionId: questionFrontendId
        title
        titleSlug
        difficulty
        isPaidOnly
      }
    }
  }`;

  const diffUpper = difficulty.toUpperCase();
  const reqBody = JSON.stringify({
    query,
    variables: {
      categorySlug: 'algorithms',
      limit,
      skip,
      filters: { difficulty: diffUpper },
    },
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      'https://leetcode.com/graphql/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(reqBody),
          'Cookie': cookieStr,
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://leetcode.com/problemset/',
        },
      },
      (res) => {
        let b = '';
        res.on('data', (c) => (b += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(b));
          } catch (e) {
            reject(new Error('Invalid JSON from LeetCode GraphQL: ' + b.slice(0, 150)));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(reqBody);
    req.end();
  });
}

async function fetchLeetCodeProblems({ usedIds, rootFiles, count = 10, difficulty = 'Medium', poolSize = 200 }) {
  const exclude = new Set(usedIds);
  const rootSet = rootFiles instanceof Set ? rootFiles : new Set(rootFiles || []);
  const diffNormalized = difficulty.toLowerCase() === 'easy' ? 'Easy' : difficulty.toLowerCase() === 'hard' ? 'Hard' : 'Medium';
  const pool = [];
  const pageSize = 100;
  const maxPages = 40;
  const targetPoolSize = Math.max(count * 2, poolSize);

  for (let page = 0; page < maxPages; page++) {
    try {
      const res = await fetchLeetCodeGraphQL({
        difficulty: diffNormalized,
        limit: pageSize,
        skip: page * pageSize,
      });
      const questions = res.data?.problemsetQuestionList?.questions || [];
      if (!questions.length) break;

      for (const q of questions) {
        if (q.isPaidOnly) continue;
        const id = `LC-${q.frontendQuestionId}`;
        const title = q.title;
        const file = toFileName(title);
        if (exclude.has(id) || rootSet.has(file)) continue;

        pool.push({
          platform: 'LeetCode',
          id,
          name: title,
          rating: q.difficulty || diffNormalized,
          tags: ['algorithms'],
          url: `https://leetcode.com/problems/${q.titleSlug}/`,
          file,
          template: 'templates/leetcode.js',
        });
      }

      if (pool.length >= targetPoolSize || questions.length < pageSize) break;
    } catch (err) {
      console.warn(`[leetcode-provider] Page ${page} fetch warning: ${err.message}`);
      break;
    }
  }

  // Fisher-Yates shuffle
  const candidates = [...pool];
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  if (candidates.length < count) {
    console.warn(`[leetcode-provider] Only found ${candidates.length} candidate problems (requested ${count}).`);
  }

  return candidates.slice(0, count);
}

module.exports = {
  fetchLeetCodeProblems,
};
