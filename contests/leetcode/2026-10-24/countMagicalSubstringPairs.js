var countMagicalPairs = function(s) {
  const n = s.length;
  const bits = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    bits[i] = 1 << (s.charCodeAt(i) - 97);
  }
  const rightCount = new Int32Array(n * 27);
  for (let m = 0; m < n; m++) {
    let mask = 0;
    let dist = 0;
    const offset = m * 27;
    for (let k = m; k < n; k++) {
      const b = bits[k];
      if ((mask & b) === 0) {
        mask |= b;
        dist++;
      }
      rightCount[offset + dist]++;
    }
  }
  let ans = 0;
  const leftCount = new Int32Array(27);
  for (let j = 0; j < n - 1; j++) {
    leftCount.fill(0);
    let mask = 0;
    let dist = 0;
    for (let i = j; i >= 0; i--) {
      const b = bits[i];
      if ((mask & b) === 0) {
        mask |= b;
        dist++;
      }
      leftCount[dist]++;
    }
    const rightOffset = (j + 1) * 27;
    for (let d = 1; d <= 26; d++) {
      if (leftCount[d] > 0) {
        ans += leftCount[d] * rightCount[rightOffset + d];
      }
    }
  }
  return ans;
};

var countPairs = countMagicalPairs;
var countMagicalSubstringPairs = countMagicalPairs;
var solve = countMagicalPairs;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const s = JSON.parse(line);
        console.log(JSON.stringify(solve(s)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
