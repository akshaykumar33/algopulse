const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const k = parseInt(input[ptr++], 10);
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);

    const diff = Math.abs(a - b);
    const d = Math.min(diff, k - diff);

    if (2 * d === k) {
      out.push(0);
    } else {
      out.push(d - 1);
    }
  }
  console.log(out.join('\n'));
}

solve();
