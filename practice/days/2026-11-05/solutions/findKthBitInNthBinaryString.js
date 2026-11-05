var findKthBit = function(n, k) {
    if (n === 1) return "0";
    let len = (1 << n) - 1;
    let mid = Math.floor(len / 2) + 1;
    if (k === mid) return "1";
    if (k < mid) return findKthBit(n - 1, k);
    let mirrored = findKthBit(n - 1, len - k + 1);
    return mirrored === "0" ? "1" : "0";
};

var solve = findKthBit;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const n = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(n, k)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
