const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const c = new Int32Array(n);
  let totalSum = 0n;
  for (let i = 0; i < n; i++) {
    c[i] = parseInt(input[ptr++], 10);
    totalSum += BigInt(c[i]);
  }
  const isCap = new Uint8Array(n);
  let capSum = 0n;
  let capSqSum = 0n;
  for (let i = 0; i < k; i++) {
    const id = parseInt(input[ptr++], 10) - 1;
    isCap[id] = 1;
    const v = BigInt(c[id]);
    capSum += v;
    capSqSum += v * v;
  }
  let ans = capSum * (totalSum - capSum) + (capSum * capSum - capSqSum) / 2n;
  for (let i = 0; i < n; i++) {
    const nxt = (i + 1) % n;
    if (!isCap[i] && !isCap[nxt]) {
      ans += BigInt(c[i]) * BigInt(c[nxt]);
    }
  }
  console.log(ans.toString());
}

solve();
