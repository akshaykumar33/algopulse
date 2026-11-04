const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const l = parseInt(input[ptr++], 10);
    const r = parseInt(input[ptr++], 10);

    if (2 * l > r) {
      out.push(r);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();

