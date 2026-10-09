var solve = function(n, trust) {
  let inDegree = new Array(n + 1).fill(0);
  let outDegree = new Array(n + 1).fill(0);
  for (let [a, b] of trust) {
    outDegree[a]++;
    inDegree[b]++;
  }
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === n - 1 && outDegree[i] === 0) {
      return i;
    }
  }
  return -1;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let n, trust;
      for (let i = 0; i < lines.length; i += 2) {
        n = JSON.parse(lines[i]);
        trust = JSON.parse(lines[i + 1]);
        const result = solve(n, trust);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
