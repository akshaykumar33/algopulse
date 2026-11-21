var divisibilityArray = function(word, m) {
  const n = word.length;
  const res = new Int32Array(n);
  const bigM = BigInt(m);
  let rem = 0n;
  for (let i = 0; i < n; i++) {
    rem = (rem * 10n + BigInt(word.charCodeAt(i) - 48)) % bigM;
    res[i] = rem === 0n ? 1 : 0;
  }
  return Array.from(res);
};

var solve = divisibilityArray;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = divisibilityArray;