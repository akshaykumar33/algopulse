const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const xs = new Int32Array(n);
  const ys = new Int32Array(n);
  const idx = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    xs[i] = parseInt(tokens[ptr++], 10);
    ys[i] = parseInt(tokens[ptr++], 10);
    idx[i] = i;
  }
  const sx = new Int32Array(xs);
  const sy = new Int32Array(ys);
  sx.sort();
  sy.sort();
  idx.sort((a, b) => (xs[a] !== xs[b] ? xs[a] - xs[b] : ys[a] - ys[b]));
  let ans = 0;
  let run = 1;
  for (let i = 1; i < n; i++) {
    if (sx[i] === sx[i - 1]) run++;
    else {
      ans += (run * (run - 1)) / 2;
      run = 1;
    }
  }
  ans += (run * (run - 1)) / 2;
  run = 1;
  for (let i = 1; i < n; i++) {
    if (sy[i] === sy[i - 1]) run++;
    else {
      ans += (run * (run - 1)) / 2;
      run = 1;
    }
  }
  ans += (run * (run - 1)) / 2;
  run = 1;
  for (let i = 1; i < n; i++) {
    const p = idx[i - 1];
    const c = idx[i];
    if (xs[p] === xs[c] && ys[p] === ys[c]) run++;
    else {
      ans -= (run * (run - 1)) / 2;
      run = 1;
    }
  }
  ans -= (run * (run - 1)) / 2;
  console.log(ans);
}

solve();
