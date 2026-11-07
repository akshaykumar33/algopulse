const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    if (n % 2 !== 0) {
      out.push(0);
      continue;
    }

    const q = [n];
    const dist = new Map();
    dist.set(n, 0);
    let head = 0;
    let ans = -1;

    while (head < q.length) {
      const u = q[head++];
      const d = dist.get(u);

      if (u % 2 !== 0) {
        ans = d;
        break;
      }

      if (d >= 4) continue;

      const s = u.toString();
      const digits = new Set();
      for (let i = 0; i < s.length; i++) {
        const dig = s.charCodeAt(i) - 48;
        if (dig > 0) digits.add(dig);
      }

      for (const dig of digits) {
        const next = u - dig;
        if (next > 0 && !dist.has(next)) {
          dist.set(next, d + 1);
          q.push(next);
        }
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
