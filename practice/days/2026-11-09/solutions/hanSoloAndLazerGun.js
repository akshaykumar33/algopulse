const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % t;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const x0 = parseInt(tokens[ptr++], 10);
  const y0 = parseInt(tokens[ptr++], 10);

  const lines = new Set();
  for (let i = 0; i < n; i++) {
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    let dx = x - x0;
    let dy = y - y0;
    const g = gcd(Math.abs(dx), Math.abs(dy));
    dx /= g;
    dy /= g;
    if (dx < 0 || (dx === 0 && dy < 0)) {
      dx = -dx;
      dy = -dy;
    }
    lines.add(dx + ',' + dy);
  }

  console.log(lines.size);
}

solve();
