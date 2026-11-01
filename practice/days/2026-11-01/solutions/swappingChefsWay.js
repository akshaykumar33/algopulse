const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const arr = s.split('');
    const half = Math.floor(n / 2);
    for (let i = 0; i < half; i++) {
      const opp = n - 1 - i;
      if (arr[i] > arr[opp]) {
        const tmp = arr[i];
        arr[i] = arr[opp];
        arr[opp] = tmp;
      }
    }
    let ok = true;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();
