const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);

    let x = n;
    let c2 = 0;
    let c5 = 0;
    while (x % 2 === 0) {
      x /= 2;
      c2++;
    }
    while (x % 5 === 0) {
      x /= 5;
      c5++;
    }

    let k = 1;
    while (c2 < c5 && k * 2 <= m) {
      k *= 2;
      c2++;
    }
    while (c5 < c2 && k * 5 <= m) {
      k *= 5;
      c5++;
    }
    while (k * 10 <= m) {
      k *= 10;
    }

    k = Math.floor(m / k) * k;
    out.push((BigInt(n) * BigInt(k)).toString());
  }

  console.log(out.join('\n'));
}

solve();
