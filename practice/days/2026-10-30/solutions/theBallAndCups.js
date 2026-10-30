const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let c = parseInt(input[ptr++], 10);
    const q = parseInt(input[ptr++], 10);

    for (let i = 0; i < q; i++) {
      const l = parseInt(input[ptr++], 10);
      const r = parseInt(input[ptr++], 10);
      if (c >= l && c <= r) {
        c = l + r - c;
      }
    }

    out.push(c);
  }

  console.log(out.join('\n'));
}

solve();
