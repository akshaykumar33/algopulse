var canEat = function(candiesCount, queries) {
  const n = candiesCount.length;
  const pref = new BigInt64Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + BigInt(candiesCount[i]);
  }
  const ans = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const type = queries[i][0];
    const day = queries[i][1];
    const cap = queries[i][2];
    const minCandies = BigInt(day + 1);
    const maxCandies = BigInt(day + 1) * BigInt(cap);
    ans[i] = maxCandies > pref[type] && minCandies <= pref[type + 1];
  }
  return ans;
};

var solve = canEat;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;

