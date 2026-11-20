const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const ta = parseInt(input[ptr++], 10);
  const tb = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
  const b = new Int32Array(m);
  for (let i = 0; i < m; i++) b[i] = parseInt(input[ptr++], 10);

  if (k >= n || k >= m) {
    console.log(-1);
    return;
  }

  let ans = 0;
  let bIdx = 0;

  for (let i = 0; i <= k; i++) {
    const arrTime = a[i] + ta;
    while (bIdx < m && b[bIdx] < arrTime) {
      bIdx++;
    }
    const remK = k - i;
    const finalBIdx = bIdx + remK;
    if (finalBIdx >= m) {
      console.log(-1);
      return;
    }
    const cand = b[finalBIdx] + tb;
    if (cand > ans) ans = cand;
  }

  console.log(ans);
}

solve();
