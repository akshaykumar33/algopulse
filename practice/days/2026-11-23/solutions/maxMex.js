const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const seen = new Uint8Array(m);
    let countM = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v < m) seen[v] = 1;
      else if (v === m) countM++;
    }
    let ok = true;
    for (let i = 1; i < m; i++) {
      if (!seen[i]) { ok = false; break; }
    }
    if (!ok) out.push(-1);
    else out.push(n - countM);
  }
  console.log(out.join('\n'));
}

solve();
