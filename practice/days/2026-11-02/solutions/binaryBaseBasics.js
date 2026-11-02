const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    let mismatches = 0;
    const half = Math.floor(n / 2);
    for (let i = 0; i < half; i++) {
      if (s[i] !== s[n - 1 - i]) {
        mismatches++;
      }
    }

    if (k < mismatches) {
      out.push('NO');
    } else {
      const leftover = k - mismatches;
      if (leftover % 2 === 0 || n % 2 !== 0) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();

