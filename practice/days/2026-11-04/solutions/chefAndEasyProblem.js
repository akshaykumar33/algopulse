const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseFloat(input[ptr++]);
    }

    a.sort().reverse();

    let sum = 0;
    for (let i = 0; i < n; i += 2) {
      sum += a[i];
    }

    out.push(sum);
  }

  console.log(out.join('\n'));
}

solve();

