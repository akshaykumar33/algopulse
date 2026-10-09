const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const m = Number(input[ptr++]);
    const p = Number(input[ptr++]);
    const q = Number(input[ptr++]);

    if (n % p === 0) {
      const k = Math.floor(n / p);
      out.push(m === k * q ? 'YES' : 'NO');
    } else {
      out.push('YES');
    }
  }

  console.log(out.join('\n'));
}

solve();
