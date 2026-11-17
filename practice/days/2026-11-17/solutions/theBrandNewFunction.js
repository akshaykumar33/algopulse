const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  const seen = new Uint8Array(1 << 21);
  let cur = [];

  for (let i = 0; i < n; i++) {
    const x = parseInt(tokens[ptr++], 10);
    const next = [x];
    seen[x] = 1;
    for (let j = 0; j < cur.length; j++) {
      const nv = cur[j] | x;
      if (next[next.length - 1] !== nv) {
        next.push(nv);
        seen[nv] = 1;
      }
    }
    cur = next;
  }

  let cnt = 0;
  for (let i = 0; i < (1 << 21); i++) {
    if (seen[i] === 1) cnt++;
  }

  console.log(cnt);
}

solve();
