var myPow = function(x, n) {
  let p = n;
  if (p < 0) {
    x = 1 / x;
    p = -p;
  }
  let ans = 1;
  while (p > 0) {
    if (p % 2 === 1) ans *= x;
    x *= x;
    p = Math.floor(p / 2);
  }
  return ans;
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
            console.log(JSON.stringify(myPow(parsed[0], parsed[1])));
            i++;
          } else if (i + 1 < lines.length) {
            const p2 = JSON.parse(lines[i + 1]);
            console.log(JSON.stringify(myPow(parsed, p2)));
            i += 2;
          } else {
            console.log(JSON.stringify(myPow(parsed, 0)));
            i++;
          }
        } catch {
          i++;
        }
      }
    }
  } catch (err) {}
}

module.exports = myPow;
