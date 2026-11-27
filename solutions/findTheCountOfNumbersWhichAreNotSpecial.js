var nonSpecialCount = function(l, r) {
  const maxP = Math.floor(Math.sqrt(r));
  const isP = new Uint8Array(maxP + 1).fill(1);
  isP[0] = isP[1] = 0;
  for (let i = 2; i * i <= maxP; i++) {
    if (isP[i]) for (let j = i * i; j <= maxP; j += i) isP[j] = 0;
  }
  let special = 0;
  for (let p = 2; p <= maxP; p++) {
    if (isP[p]) {
      const sq = p * p;
      if (sq >= l && sq <= r) special++;
    }
  }
  return (r - l + 1) - special;
};
var solve = nonSpecialCount;
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
module.exports = nonSpecialCount;
