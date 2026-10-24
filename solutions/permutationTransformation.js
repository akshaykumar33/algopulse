const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }

    const depth = new Int32Array(n);

    function build(l, r, d) {
      if (l > r) return;
      let maxIdx = l;
      for (let i = l + 1; i <= r; i++) {
        if (a[i] > a[maxIdx]) maxIdx = i;
      }
      depth[maxIdx] = d;
      build(l, maxIdx - 1, d + 1);
      build(maxIdx + 1, r, d + 1);
    }

    build(0, n - 1, 0);
    out.push(depth.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
