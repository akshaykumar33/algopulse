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
  const cleanData = {};

  for (const p of ccProblems) {
    const code = p.id.replace('CC-', '');
    try {
      const data = await fetchProblem(code);
      const comp = data.problemComponents || {};
      let statement = comp.statement || data.body || '';
      let samples = comp.sampleTestCases || [];
      if (samples.length === 0 && data.body) {
        // Parse from body if needed
      }
      cleanData[p.file] = {
        code,
        name: data.problem_name,
        statement,
        constraints: comp.constraints || '',
        samples: samples.map(s => ({
          input: s.input,
          output: s.output
        }))
      };
      console.log(`✓ ${p.file} (${code}): ${samples.length} sample(s)`);
    } catch (e) {
      console.error(`✗ ${p.file} (${code}): ${e.message}`);
    }
  }

  fs.writeFileSync('scripts/cc_clean_data.json', JSON.stringify(cleanData, null, 2), 'utf8');
  console.log('Saved clean data to scripts/cc_clean_data.json');
}

main();
