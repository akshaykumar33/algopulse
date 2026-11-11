const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  let arr = new Int32Array(200005);
  let seen = new Int32Array(200005);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    if (n > arr.length) arr = new Int32Array(n);
    if (n + 2 > seen.length) seen = new Int32Array(n + 2);
    const mark = tc + 1;

    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      arr[i] = v;
      if (v >= 0 && v <= n) {
        seen[v] = mark;
      }
    }

    let mex = 0;
    while (seen[mex] === mark) {
      mex++;
    }

    let moves = -(mex * (mex - 1)) / 2;
    for (let i = 0; i < n; i++) {
      const v = arr[i];
      if (v < mex) {
        moves += v;
      } else if (v > mex) {
        moves += v - mex - 1;
      }
    }

    out.push(moves % 2 === 1 ? 'Alice' : 'Bob');
  }

  console.log(out.join('\n'));
}

solve();
