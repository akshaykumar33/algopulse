var divisibilityArray = function(word, m) {
  const n = word.length;
  const ans = new Int32Array(n);
  const bigM = BigInt(m);
  let rem = 0n;

  for (let i = 0; i < n; i++) {
    rem = (rem * 10n + BigInt(word.charCodeAt(i) - 48)) % bigM;
    ans[i] = rem === 0n ? 1 : 0;
  }

  return Array.from(ans);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(divisibilityArray(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = divisibilityArray;
