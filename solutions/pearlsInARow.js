const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);

  const segs = [];
  let l = 0;
  let seen = new Set();
  for (let r = 0; r < n; r++) {
    if (seen.has(a[r])) {
      segs.push([l + 1, r + 1]);
      seen.clear();
      l = r + 1;
    } else {
      seen.add(a[r]);
    }
  }

  if (segs.length === 0) {
    console.log(-1);
    return;
  }

  segs[segs.length - 1][1] = n;
  const out = [segs.length];
  for (let i = 0; i < segs.length; i++) {
    out.push(segs[i][0] + ' ' + segs[i][1]);
  }
  console.log(out.join('\n'));
}

solve();
