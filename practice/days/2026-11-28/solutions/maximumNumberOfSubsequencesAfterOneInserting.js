var numOfSubsequences = function(s) {
  const n = s.length;
  let totT = 0;
  for (let i = 0; i < n; i++) if (s[i] === 'T') totT++;
  let l = 0, c = 0, lc = 0, lct = 0, ct = 0, t = totT, best = 0;
  for (let i = 0; i < n; i++) {
    if (l * t > best) best = l * t;
    if (s[i] === 'L') l++;
    else if (s[i] === 'C') { lc += l; ct += t; }
    else if (s[i] === 'T') { lct += lc; t--; }
  }
  return lct + Math.max(best, lc, ct);
};
var solve = numOfSubsequences;
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
module.exports = numOfSubsequences;
