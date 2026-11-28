var minOperations = function(s1, s2) {
  const n = s1.length;
  let add = 0, need = 0, pairs = 0, cov = -1;
  for (let i = 0; i < n; i++) {
    if (s1[i] === '0' && s2[i] === '1') add++;
    if (s1[i] === '1' && s2[i] === '0') {
      need++;
      if (cov >= i) continue;
      if (i + 1 < n) { pairs++; cov = i + 1; }
      else if (i >= 1) { pairs++; cov = i; }
      else return -1;
    }
  }
  return 3 * pairs + add - need;
};
var solve = minOperations;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = minOperations;
