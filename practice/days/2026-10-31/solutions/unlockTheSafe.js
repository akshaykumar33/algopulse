const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(tokens[ptr++], 10));
    const b = [];
    for (let i = 0; i < n; i++) b.push(parseInt(tokens[ptr++], 10));

    let minSum = 0;
    let minDelta = 9;

    for (let i = 0; i < n; i++) {
      const c1 = (b[i] - a[i] + 9) % 9;
      const c2 = (a[i] - b[i] + 9) % 9;
      const d = Math.min(c1, c2);
      minSum += d;
      minDelta = Math.min(minDelta, 9 - 2 * d);
    }

    if (k < minSum) {
      out.push('NO');
    } else if ((k - minSum) % 2 === 0) {
      out.push('YES');
    } else if (k >= minSum + minDelta) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

