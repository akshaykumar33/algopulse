var minSteps = function(s, t) {
  const cnt = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) cnt[s.charCodeAt(i) - 97]++;
  for (let i = 0; i < t.length; i++) cnt[t.charCodeAt(i) - 97]--;
  let ans = 0;
  for (const c of cnt) ans += Math.abs(c);
  return ans;
};
var solve = minSteps;
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
module.exports = minSteps;
