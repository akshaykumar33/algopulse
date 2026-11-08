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
    let l = 0;
    let r = n - 1;
    let turn = 0;
    const buf = new Array(2 * n + 5);
    let front = n + 2;
    let back = n + 2;

    while (l <= r) {
      if (turn === 0) {
        const c = s[l++];
        if (c === '0') {
          buf[--front] = c;
        } else {
          buf[back++] = c;
        }
      } else {
        const c = s[r--];
        if (c === '1') {
          buf[--front] = c;
        } else {
          buf[back++] = c;
        }
      }
      turn ^= 1;
    }

    out.push(buf.slice(front, back).join(''));
  }

  console.log(out.join('\n'));
}

solve();
