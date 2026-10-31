const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const maxDiscount = [-1, -1, -1, -1];
    const bestCity = [Infinity, Infinity, Infinity, Infinity];

    for (let i = 0; i < n; i++) {
      const c = parseInt(tokens[ptr++], 10);
      const l = parseInt(tokens[ptr++], 10);
      const x = parseInt(tokens[ptr++], 10);

      if (x > maxDiscount[l] || (x === maxDiscount[l] && c < bestCity[l])) {
        maxDiscount[l] = x;
        bestCity[l] = c;
      }
    }

    out.push(`${maxDiscount[1]} ${bestCity[1]}`);
    out.push(`${maxDiscount[2]} ${bestCity[2]}`);
    out.push(`${maxDiscount[3]} ${bestCity[3]}`);
  }

  console.log(out.join('\n'));
}

solve();
