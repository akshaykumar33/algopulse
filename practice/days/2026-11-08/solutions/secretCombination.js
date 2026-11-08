const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 2 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const s = tokens[1];

  let best = null;

  for (let shift = 0; shift < n; shift++) {
    const firstDigit = s.charCodeAt(shift) - 48;
    const add = (10 - firstDigit) % 10;
    const chars = [];
    for (let j = 0; j < n; j++) {
      const d = (s.charCodeAt((shift + j) % n) - 48 + add) % 10;
      chars.push(String.fromCharCode(d + 48));
    }
    const candidate = chars.join('');
    if (best === null || candidate < best) {
      best = candidate;
    }
  }

  console.log(best);
}

solve();
