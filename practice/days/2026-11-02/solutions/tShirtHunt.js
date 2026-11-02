const fs = require('fs');

function wins(s, p) {
  let i = Math.floor(s / 50) % 475;
  for (let step = 0; step < 25; step++) {
    i = (i * 96 + 42) % 475;
    if (i + 26 === p) return true;
  }
  return false;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  const p = parseInt(tokens[0], 10);
  const x = parseInt(tokens[1], 10);
  const y = parseInt(tokens[2], 10);

  for (let s = x; s >= y; s -= 50) {
    if (wins(s, p)) {
      console.log(0);
      return;
    }
  }

  for (let s = x + 50; ; s += 50) {
    if (wins(s, p)) {
      const k = (s - x) / 50;
      console.log(Math.ceil(k / 2));
      return;
    }
  }
}

solve();

