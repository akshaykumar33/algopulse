const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s1 = parseInt(tokens[ptr++], 10);
    const s2 = parseInt(tokens[ptr++], 10);

    const items = [];
    for (let i = 1; i <= n; i++) {
      items.push({ idx: i, r: parseInt(tokens[ptr++], 10) });
    }
    items.sort((a, b) => b.r - a.r);

    const a = [];
    const b = [];

    for (let i = 0; i < n; i++) {
      const costA = (a.length + 1) * s1;
      const costB = (b.length + 1) * s2;
      if (costA <= costB) {
        a.push(items[i].idx);
      } else {
        b.push(items[i].idx);
      }
    }

    out.push(a.length + (a.length > 0 ? ' ' + a.join(' ') : ''));
    out.push(b.length + (b.length > 0 ? ' ' + b.join(' ') : ''));
  }

  console.log(out.join('\n'));
}

solve();
