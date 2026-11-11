const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const h1 = parseInt(tokens[ptr++], 10);
  const h2 = parseInt(tokens[ptr++], 10);
  const a = parseInt(tokens[ptr++], 10);
  const b = parseInt(tokens[ptr++], 10);

  const h = h1 + 8 * a;
  if (h >= h2) {
    console.log(0);
    return;
  }

  if (a <= b) {
    console.log(-1);
    return;
  }

  const step = 12 * (a - b);
  const ans = Math.floor((h2 - h + step - 1) / step);
  console.log(ans);
}

solve();
