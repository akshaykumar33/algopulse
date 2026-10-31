const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const powers = [];
  let p = 1n;
  for (let i = 0; i <= 62; i++) {
    powers.push(p.toString());
    p *= 2n;
  }

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let best = Infinity;

    for (const target of powers) {
      let tp = 0;
      for (let sp = 0; sp < s.length && tp < target.length; sp++) {
        if (s[sp] === target[tp]) {
          tp++;
        }
      }
      const moves = s.length + target.length - 2 * tp;
      if (moves < best) best = moves;
    }

    out.push(best);
  }

  console.log(out.join('\n'));
}

solve();
