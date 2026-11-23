const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const k = BigInt(input[ptr++]);
    const h = BigInt(input[ptr++]);
    let ans = 0n;
    if (n >= h) {
      ans += (n - h + 1n) * n;
    }
    const maxA = n < h - 1n ? n : h - 1n;
    if (k > 1n) {
      for (let a = 1n; a <= maxA; a++) {
        const num = k * a - h;
        if (num >= 0n) {
          let bMax = num / (k - 1n);
          if (bMax > a - 1n) bMax = a - 1n;
          if (bMax > n) bMax = n;
          if (bMax >= 1n) ans += bMax;
        }
      }
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
