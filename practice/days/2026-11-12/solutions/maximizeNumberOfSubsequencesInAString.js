var maximumSubsequenceCount = function(text, pattern) {
  const a = pattern[0];
  const b = pattern[1];
  let ans = 0;
  let cntA = 0;
  let cntB = 0;
  const n = text.length;

  for (let i = 0; i < n; i++) {
    const ch = text[i];
    if (ch === b) {
      ans += cntA;
      cntB++;
    }
    if (ch === a) {
      cntA++;
    }
  }

  return ans + (cntA > cntB ? cntA : cntB);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 2 && typeof p[0] === 'string';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(maximumSubsequenceCount(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(maximumSubsequenceCount(...args)));
      }
    }
  }
}

module.exports = maximumSubsequenceCount;
