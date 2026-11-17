const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let idx = 0;
  const T = parseInt(input[idx++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    if (idx >= input.length) break;
    const n = parseInt(input[idx++].trim(), 10);
    const a = input[idx++].trim();
    const b = input[idx++].trim();

    const ops = [];
    let inBlock = false;
    let start = -1;

    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) {
        if (!inBlock) {
          inBlock = true;
          start = i + 1;
        }
      } else {
        if (inBlock) {
          ops.push(`1 ${start} ${i}`);
          inBlock = false;
        }
      }
    }
    if (inBlock) {
      ops.push(`1 ${start} ${n}`);
    }

    out.push(ops.length.toString());
    for (const op of ops) {
      out.push(op);
    }
  }

  console.log(out.join('\n'));
}

solve();
