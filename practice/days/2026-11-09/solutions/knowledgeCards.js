const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    const cap = n * m - 4;
    const onBoard = new Uint8Array(k + 1);
    let target = k;
    let cnt = 0;
    let ok = true;

    for (let i = 0; i < k; i++) {
      const x = parseInt(tokens[ptr++], 10);
      onBoard[x] = 1;
      cnt++;
      if (cnt > cap + 1) {
        ok = false;
      }
      while (target >= 1 && onBoard[target]) {
        onBoard[target] = 0;
        cnt--;
        target--;
      }
    }

    out.push(ok ? 'YA' : 'TIDAK');
  }

  console.log(out.join('\n'));
}

solve();

