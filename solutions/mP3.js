const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const I = parseInt(input[ptr++], 10);

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
  a.sort();

  const maxK = Math.floor((8 * I) / n);
  if (maxK >= 30) {
    console.log(0);
    return;
  }

  const K = 1 << maxK;

  const vals = [];
  const cnts = [];
  let curVal = a[0];
  let curCnt = 1;
  for (let i = 1; i < n; i++) {
    if (a[i] === curVal) {
      curCnt++;
    } else {
      vals.push(curVal);
      cnts.push(curCnt);
      curVal = a[i];
      curCnt = 1;
    }
  }
  vals.push(curVal);
  cnts.push(curCnt);

  const numDistinct = cnts.length;
  if (numDistinct <= K) {
    console.log(0);
    return;
  }

  let windowSum = 0;
  for (let i = 0; i < K; i++) {
    windowSum += cnts[i];
  }
  let maxWindow = windowSum;

  for (let i = K; i < numDistinct; i++) {
    windowSum += cnts[i] - cnts[i - K];
    if (windowSum > maxWindow) maxWindow = windowSum;
  }

  console.log(n - maxWindow);
}

solve();
