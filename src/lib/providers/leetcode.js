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
      categorySlug: '',
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
  const diffNormalized = difficulty.toLowerCase() === 'easy' ? 'Easy' : difficulty.toLowerCase() === 'hard' ? 'Hard' : 'Medium';
  const allQuestions = [];

  const pageSize = 100;
  const pagesToFetch = Math.ceil(Math.max(count * 2, poolSize) / pageSize);

  for (let page = 0; page < Math.min(pagesToFetch, 4); page++) {
    try {
      const res = await fetchLeetCodeGraphQL({
        difficulty: diffNormalized,
        limit: pageSize,
        skip: page * pageSize,
      });
      const questions = res.data?.problemsetQuestionList?.questions || [];
      allQuestions.push(...questions);
      if (questions.length < pageSize) break;
    } catch (err) {
      console.warn(`[leetcode-provider] Page ${page} fetch warning: ${err.message}`);
      break;
    }
  }

  const pool = allQuestions
    .filter((q) => !q.isPaidOnly)
    .map((q) => {
      const id = `LC-${q.frontendQuestionId}`;
      const title = q.title;
      return {
        platform: 'LeetCode',
        id,
        name: title,
        rating: q.difficulty || diffNormalized,
        tags: ['algorithms'],
        url: `https://leetcode.com/problems/${q.titleSlug}/`,
        file: toFileName(title),
        template: 'templates/leetcode.js',
      };
    })
    .filter((p) => !exclude.has(p.id) && !rootFiles.has(p.file));

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
