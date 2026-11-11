var maxNumberOfFamilies = function(n, reservedSeats) {
  const rows = new Map();
  for (let i = 0; i < reservedSeats.length; i++) {
    const r = reservedSeats[i][0];
    const s = reservedSeats[i][1];
    if (s === 1 || s === 10) continue;
    rows.set(r, (rows.get(r) || 0) | (1 << (s - 2)));
  }
  let ans = 2 * n;
  for (const mask of rows.values()) {
    const leftOk = (mask & 15) === 0;
    const midOk = (mask & 60) === 0;
    const rightOk = (mask & 240) === 0;
    if (leftOk && rightOk) continue;
    if (leftOk || midOk || rightOk) ans -= 1;
    else ans -= 2;
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
      console.log(JSON.stringify(maxNumberOfFamilies(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(maxNumberOfFamilies(...p)));
      }
    }
  }
}

module.exports = maxNumberOfFamilies;
