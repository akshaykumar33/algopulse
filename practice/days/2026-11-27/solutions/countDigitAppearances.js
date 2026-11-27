var countDigits = function(n, d) {
  let ans = 0;
  const s = d.toString();
  for (let i = 1; i <= n; i++) {
    const str = i.toString();
    for (let j = 0; j < str.length; j++) if (str[j] === s) ans++;
  }
  return ans;
};
var solve = countDigits;
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
module.exports = countDigits;
