const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);

  const x = new Array(26);
  const y = new Array(26);
  x[1] = 1;
  y[1] = 2;
  x[2] = 1;
  y[2] = 4;
  for (let i = 3; i <= 25; i++) {
    x[i] = x[i - 1] + 2 * x[i - 2];
    y[i] = y[i - 1] * 2;
  }

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    out.push(x[n], y[n]);
  }

  console.log(out.join(' '));
}

solve();
