var lenLongestFibSubseq = function(arr) {
  const n = arr.length;
  const index = new Map();
  for (let i = 0; i < n; i++) index.set(arr[i], i);

  const dp = new Map();
  let maxLen = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const diff = arr[i] - arr[j];
      const k = index.get(diff);
      if (k !== undefined && k < j) {
        const len = (dp.get(k * n + j) || 2) + 1;
        dp.set(j * n + i, len);
        if (len > maxLen) maxLen = len;
      }
    }
  }
  return maxLen >= 3 ? maxLen : 0;
};

var solve = lenLongestFibSubseq;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
