const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);

  const maxIdx = Math.floor(Math.sqrt(2 * n)) + 2;
  const tri = [];
  const set = new Set();
  for (let i = 1; i <= maxIdx; i++) {
    const val = (i * (i + 1)) / 2;
    if (val <= n) {
      tri.push(val);
      set.add(val);
    }
  }

  let found = false;
  for (let i = 0; i < tri.length; i++) {
    const rem = n - tri[i];
    if (rem > 0 && set.has(rem)) {
      found = true;
      break;
    }
  }

  const out = [];
  if (found) {
    out.push('YES');
  } else {
    out.push('NO');
  }
  console.log(out.join('\n'));
}

solve();
