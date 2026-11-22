const fs = require('fs');
function popcount(x) {
  let cnt = 0;
  while (x > 0n) {
    if ((x & 1n) === 1n) cnt++;
    x >>= 1n;
  }
  return cnt;
}
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const a = BigInt(input[ptr++]), b = BigInt(input[ptr++]);
    if (a === b) {
      out.push(0);
      continue;
    }
    if (b === 0n) {
      out.push(-1);
      continue;
    }
    if (b === 1n) {
      if (a === 0n) out.push(1);
      else out.push(-1);
      continue;
    }
    const cntA = popcount(a);
    const cntB = popcount(b - 1n);
    if (cntA > cntB) {
      out.push(2);
    } else {
      out.push(cntB - cntA + 1);
    }
  }
  console.log(out.join('\n'));
}
solve();