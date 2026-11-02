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
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(tokens[ptr++], 10));
    }

    a.sort((x, y) => x - y);

    let score = 0;
    for (let i = 0; i < n - 2 * k; i++) {
      score += a[i];
    }

    for (let i = 0; i < k; i++) {
      score += Math.floor(a[n - 2 * k + i] / a[n - k + i]);
    }

    out.push(score);
  }

  console.log(out.join('\n'));
}

solve();

