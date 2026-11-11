var maximumImportance = function(n, roads) {
  const deg = new Int32Array(n);
  for (let i = 0; i < roads.length; i++) {
    deg[roads[i][0]]++;
    deg[roads[i][1]]++;
  }
  deg.sort();
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += deg[i] * (i + 1);
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    const isPacked = parsed.every((p) => Array.isArray(p) && p.length === 2 && typeof p[0] === 'number');
    if (parsed.length === 2 && !isPacked) {
      console.log(JSON.stringify(maximumImportance(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(maximumImportance(...p)));
      }
    }
  }
}

module.exports = maximumImportance;
