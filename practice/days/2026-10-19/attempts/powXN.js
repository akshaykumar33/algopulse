var myPow = function(x, n) {
  if (n === 0) return 1;
  let p = n < 0 ? -n : n;
  let ans = 1;
  let cur = x;
  while (p > 0) {
    if (p % 2 === 1) ans *= cur;
    cur *= cur;
    p = Math.floor(p / 2);
  }
  return n < 0 ? 1 / ans : ans;
};

var powXN = myPow;
var solve = myPow;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let i = 0;
      while (i < lines.length) {
        try {
          const parsed = JSON.parse(lines[i]);
          if (Array.isArray(parsed) && parsed.length >= 2) {
            console.log(myPow(parsed[0], parsed[1]));
            i++;
          } else if (i + 1 < lines.length) {
            const p2 = JSON.parse(lines[i + 1]);
            console.log(myPow(parsed, p2));
            i += 2;
          } else {
            i++;
          }
        } catch (_) {
          i++;
        }
      }
    }
  } catch (_) {}
}

module.exports = myPow;
