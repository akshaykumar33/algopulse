const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const h = new Array(n);
    for (let i = 0; i < n; i++) h[i] = parseInt(input[ptr++], 10);
    
    const ext = [];
    for (let i = 1; i < n - 1; i++) {
      if ((h[i] > h[i - 1] && h[i] > h[i + 1]) || (h[i] < h[i - 1] && h[i] < h[i + 1])) {
        ext.push(i);
      }
    }

    let l = 0;
    let extPtr = 0;
    let ans = 0n;

    for (let r = 1; r < n; r++) {
      while (extPtr + 1 < ext.length && ext[extPtr + 1] < r) {
        l = ext[extPtr];
        extPtr++;
      }
      ans += BigInt(r - l);
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
solve();