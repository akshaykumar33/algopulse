var minGroupsForValidAssignment = function(balls) {
  const cnt = new Map();
  for (const x of balls) cnt.set(x, (cnt.get(x) || 0) + 1);
  const fr = [...cnt.values()];
  let mn = Infinity;
  for (const c of fr) if (c < mn) mn = c;
  for (let s = mn; s >= 1; s--) {
    let ans = 0, ok = true;
    for (const c of fr) {
      const g = Math.ceil(c / (s + 1));
      if (g * s > c) { ok = false; break; }
      ans += g;
    }
    if (ok) return ans;
  }
  return balls.length;
};
var solve = minGroupsForValidAssignment;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = minGroupsForValidAssignment;
