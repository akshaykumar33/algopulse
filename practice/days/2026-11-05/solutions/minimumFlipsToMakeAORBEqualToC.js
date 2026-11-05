var minFlips = function(a, b, c) {
    let ans = 0;
    for (let i = 0; i < 32; i++) {
        let bitA = (a >> i) & 1;
        let bitB = (b >> i) & 1;
        let bitC = (c >> i) & 1;
        if (bitC === 1) {
            if (bitA === 0 && bitB === 0) {
                ans += 1;
            }
        } else {
            ans += bitA + bitB;
        }
    }
    return ans;
};
var solve = typeof minFlips !== 'undefined' ? minFlips : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 < lines.length) {
          const a = JSON.parse(lines[i]);
          const b = JSON.parse(lines[i+1]);
          const c = JSON.parse(lines[i+2]);
          console.log(JSON.stringify(solve(a, b, c)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
