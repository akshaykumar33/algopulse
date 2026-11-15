const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const a = [];
  for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

  const segs = [];
  let set = new Set();
  let l = 0;

  for (let i = 0; i < n; i++) {
    if (set.has(a[i])) {
      segs.push([l + 1, i + 1]);
      l = i + 1;
      set = new Set();
    } else {
      set.add(a[i]);
    }
  }

  if (segs.length === 0) {
    console.log(-1);
    return;
  }

  segs[segs.length - 1][1] = n;
  const out = [segs.length];
  for (const [s, e] of segs) out.push(s + ' ' + e);
  console.log(out.join('\n'));
}

solve();
