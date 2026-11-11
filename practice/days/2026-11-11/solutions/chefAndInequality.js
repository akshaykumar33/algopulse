const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);
    const d = parseInt(tokens[ptr++], 10);

    if (a > b || c > d) {
      out.push(0);
      continue;
    }

    let ans = 0;
    const end1 = b < c - 1 ? b : c - 1;
    if (a <= end1) {
      ans += (end1 - a + 1) * (d - c + 1);
    }

    const l = a > c ? a : c;
    const r = b < d - 1 ? b : d - 1;
    if (l <= r) {
      const m = r - l + 1;
      ans += (m * (2 * d - l - r)) / 2;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
