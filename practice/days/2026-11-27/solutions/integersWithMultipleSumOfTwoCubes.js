var findCubes = function(limit) {
  const map = new Map();
  const maxC = Math.floor(Math.cbrt(limit));
  for (let a = 1; a <= maxC; a++) {
    for (let b = a; a * a * a + b * b * b <= limit; b++) {
      const sum = a * a * a + b * b * b;
      map.set(sum, (map.get(sum) || 0) + 1);
    }
  }
  const res = [];
  for (const [k, v] of map.entries()) {
    if (v >= 2) res.push(k);
  }
  res.sort((a, b) => a - b);
  return res;
};
var solve = findCubes;
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
module.exports = findCubes;
