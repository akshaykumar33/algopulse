var maxUniqueSplit = function(s) {
  const seen = new Set();
  let ans = 0;
  const dfs = (i) => {
    if (seen.size + (s.length - i) <= ans) return;
    if (i === s.length) { ans = seen.size; return; }
    for (let j = i + 1; j <= s.length; j++) {
      const t = s.slice(i, j);
      if (seen.has(t)) continue;
      seen.add(t);
      dfs(j);
      seen.delete(t);
    }
  };
  dfs(0);
  return ans;
};
var solve = maxUniqueSplit;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = maxUniqueSplit;
