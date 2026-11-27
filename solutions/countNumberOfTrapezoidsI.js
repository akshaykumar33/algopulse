var countTrapezoids = function(points) {
  const map = new Map();
  for (const [x, y] of points) {
    if (!map.has(y)) map.set(y, []);
    map.get(y).push(x);
  }
  let ans = 0;
  const ys = Array.from(map.keys());
  for (let i = 0; i < ys.length; i++) {
    for (let j = i + 1; j < ys.length; j++) {
      const c1 = map.get(ys[i]).length;
      const c2 = map.get(ys[j]).length;
      if (c1 >= 2 && c2 >= 2) {
        ans += (c1 * (c1 - 1) / 2) * (c2 * (c2 - 1) / 2);
      }
    }
  }
  return ans;
};
var solve = countTrapezoids;
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
module.exports = countTrapezoids;
