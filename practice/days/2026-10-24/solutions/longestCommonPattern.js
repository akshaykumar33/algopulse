const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let a = input[ptr++];
    let b = input[ptr++];
    let fA = {};
    let fB = {};
    for (let i = 0; i < a.length; i++) {
      let ch = a[i];
      fA[ch] = (fA[ch] || 0) + 1;
    }
    for (let i = 0; i < b.length; i++) {
      let ch = b[i];
      fB[ch] = (fB[ch] || 0) + 1;
    }
    let ans = 0;
    for (let ch in fA) {
      if (fB[ch]) {
        ans += Math.min(fA[ch], fB[ch]);
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
