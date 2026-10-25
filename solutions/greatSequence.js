const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let x = BigInt(input[ptr++]);
    let a = [];
    let freq = new Map();
    for (let i = 0; i < n; i++) {
      let v = BigInt(input[ptr++]);
      a.push(v);
      freq.set(v, (freq.get(v) || 0) + 1);
    }
    a.sort((p, q) => (p < q ? -1 : p > q ? 1 : 0));
    let ans = 0;
    for (let i = 0; i < n; i++) {
      let v = a[i];
      let cnt = freq.get(v) || 0;
      if (cnt === 0) continue;
      freq.set(v, cnt - 1);
      let target = v * x;
      let targetCnt = freq.get(target) || 0;
      if (targetCnt > 0) {
        freq.set(target, targetCnt - 1);
      } else {
        ans++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
