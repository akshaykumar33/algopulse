var countCommas = function(n) {
  let ans = 0n;
  let p = 1000n;
  while (p <= BigInt(n)) {
    ans += BigInt(n) - p + 1n;
    p *= 1000n;
  }
  return Number(ans);
};
var solve = countCommas;
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
module.exports = countCommas;
