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
    const nodes = new Array(n + 1);

    for (let i = 1; i <= n; i++) {
      const type = parseInt(tokens[ptr++], 10);
      if (type === 0) {
        nodes[i] = [0];
      } else {
        const a = parseInt(tokens[ptr++], 10);
        const b = parseInt(tokens[ptr++], 10);
        nodes[i] = [type, a, b];
      }
    }

    let low = 0.0;
    let high = 1.0;
    const prob = new Float64Array(n + 1);

    for (let iter = 0; iter < 60; iter++) {
      const mid = (low + high) / 2.0;
      for (let i = 1; i <= n; i++) {
        const node = nodes[i];
        if (node[0] === 0) {
          prob[i] = mid;
        } else if (node[0] === 1) {
          const pa = prob[node[1]];
          const pb = prob[node[2]];
          prob[i] = pa + pb - pa * pb;
        } else {
          const pa = prob[node[1]];
          const pb = prob[node[2]];
          prob[i] = pa * pb;
        }
      }

      if (prob[n] < 0.5) {
        low = mid;
      } else {
        high = mid;
      }
    }

    out.push(low.toFixed(5));
  }

  console.log(out.join('\n'));
}

solve();
