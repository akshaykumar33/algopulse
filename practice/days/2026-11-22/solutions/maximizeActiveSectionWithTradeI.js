var maxActiveSectionsAfterTrade = function(s) {
  const n = s.length;
  let initialOnes = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === '1') initialOnes++;
  }
  const blocks = [];
  let i = 0;
  while (i < n) {
    let j = i;
    while (j < n && s[j] === s[i]) j++;
    blocks.push({ char: s[i], len: j - i, start: i, end: j - 1 });
    i = j;
  }
  let maxGain = 0;
  let hasValidTrade = false;
  for (let k = 0; k < blocks.length; k++) {
    if (blocks[k].char === '1') {
      if (blocks[k].start > 0 && blocks[k].end < n - 1) {
        hasValidTrade = true;
        const leftZeros = blocks[k - 1].len;
        const rightZeros = blocks[k + 1].len;
        const gain = leftZeros + rightZeros;
        maxGain = Math.max(maxGain, gain);
      }
    }
  }
  if (!hasValidTrade) return initialOnes;
  return initialOnes + maxGain;
};
var solve = maxActiveSectionsAfterTrade;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0])));
    }
  } catch (e) {}
}
module.exports = maxActiveSectionsAfterTrade;