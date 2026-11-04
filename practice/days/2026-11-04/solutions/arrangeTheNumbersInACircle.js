const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const strong = [];
    let w = 0n;

    for (let i = 0; i < n; i++) {
      const c = BigInt(input[ptr++]);
      if (c >= 2n) {
        strong.push(c);
      } else if (c === 1n) {
        w++;
      }
    }

    if (strong.length === 0) {
      out.push(0);
      continue;
    }

    if (strong.length === 1) {
      const c = strong[0];
      const cap = c / 2n;
      const useW = w < cap ? w : cap;
      const total = c + useW;
      out.push(total >= 3n ? total.toString() : 0);
      continue;
    }

    let sumS = 0n;
    let capAll = 0n;
    let maxC = 0n;

    for (let i = 0; i < strong.length; i++) {
      const c = strong[i];
      sumS += c;
      capAll += (c - 2n) / 2n;
      if (c > maxC) maxC = c;
    }

    const useWAll = w < capAll ? w : capAll;
    const ansAll = sumS + useWAll;

    const capSingle = maxC / 2n;
    const useWSingle = w < capSingle ? w : capSingle;
    const ansSingle = maxC + useWSingle;

    let ans = ansAll > ansSingle ? ansAll : ansSingle;
    if (ans < 3n) ans = 0n;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
