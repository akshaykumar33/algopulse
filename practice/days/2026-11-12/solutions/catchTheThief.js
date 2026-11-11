const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    ptr++;
    out.push(Math.abs(x - y) % (2 * k) === 0 ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();
