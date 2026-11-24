const https = require('https');
const fs = require('fs');

function fetchProblem(code) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.codechef.com/api/contests/PRACTICE/problems/${code}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const set = JSON.parse(fs.readFileSync('practice/days/2026-11-24/set.json', 'utf8'));
  const ccProblems = set.problems.filter(p => p.platform === 'CodeChef');
  console.log(`Fetching ${ccProblems.length} CodeChef problems...`);

  const results = {};
  for (const p of ccProblems) {
    const code = p.id.replace('CC-', '');
    try {
      const data = await fetchProblem(code);
      results[p.file] = {
        code,
        name: data.problem_name,
        body: data.body,
        timeLimit: data.max_timelimit,
        tags: data.user_tags || data.computed_tags
      };
      console.log(`✓ Fetched ${p.file} (${code})`);
    } catch (e) {
      console.error(`✗ Error ${p.file} (${code}): ${e.message}`);
    }
  }

  fs.writeFileSync('scripts/cc_problems_data.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved all problem data to scripts/cc_problems_data.json');
}

main();
