const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Float64Array(n + 1);
    for (let i = 1; i <= n; i++) {
      a[i] = parseFloat(tokens[ptr++]);
    }

    const prefRight = new Float64Array(n + 1);
    for (let i = 1; i < n; i++) {
      let cost = 1;
      if (i > 1) {
        const distLeft = a[i] - a[i - 1];
        const distRight = a[i + 1] - a[i];
        if (distLeft < distRight) {
          cost = distRight;
        }
      }
      prefRight[i + 1] = prefRight[i] + cost;
    }

    const prefLeft = new Float64Array(n + 1);
    for (let i = n; i > 1; i--) {
      let cost = 1;
      if (i < n) {
        const distLeft = a[i] - a[i - 1];
        const distRight = a[i + 1] - a[i];
        if (distRight < distLeft) {
          cost = distLeft;
        }
      }
      prefLeft[i - 1] = prefLeft[i] + cost;
    }

    const m = parseInt(tokens[ptr++], 10);
    for (let q = 0; q < m; q++) {
      const s = parseInt(tokens[ptr++], 10);
      const target = parseInt(tokens[ptr++], 10);
      if (s < target) {
        out.push(prefRight[target] - prefRight[s]);
      } else {
        out.push(prefLeft[target] - prefLeft[s]);
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
