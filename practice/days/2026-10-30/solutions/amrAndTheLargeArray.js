const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  const MAX = 1000000;
  const freq = new Int32Array(MAX + 1);
  const first = new Int32Array(MAX + 1);
  const last = new Int32Array(MAX + 1);

  let maxFreq = 0;
  for (let i = 1; i <= n; i++) {
    const val = parseInt(tokens[ptr++], 10);
    freq[val]++;
    if (first[val] === 0) first[val] = i;
    last[val] = i;
    if (freq[val] > maxFreq) maxFreq = freq[val];
  }

  let minLen = Infinity;
  let bestL = 1;
  let bestR = n;

  for (let val = 1; val <= MAX; val++) {
    if (freq[val] === maxFreq) {
      const len = last[val] - first[val] + 1;
      if (len < minLen) {
        minLen = len;
        bestL = first[val];
        bestR = last[val];
      }
    }
  }

  console.log(bestL + ' ' + bestR);
}

solve();
