const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  const getCost = (vec) => {
    if (vec.length === 0) return 0;
    const med = Math.floor(vec.length / 2);
    let cost = 0;
    for (let p = 0; p < vec.length; p++) {
      const target = vec[med] - (med - p);
      cost += Math.abs(vec[p] - target);
    }
    return cost;
  };

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const a = [];
    const b = [];

    for (let i = 0; i < n; i++) {
      if (s[i] === 'a') a.push(i);
      else b.push(i);
    }

    const costA = getCost(a);
    const costB = getCost(b);
    out.push(Math.min(costA, costB));
  }
  console.log(out.join('\n'));
}

solve();
