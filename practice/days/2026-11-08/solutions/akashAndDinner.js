const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    const minTime = new Map();
    for (let i = 0; i < n; i++) {
      const time = parseInt(tokens[ptr++], 10);
      const cat = a[i];
      const prev = minTime.get(cat);
      if (prev === undefined || time < prev) {
        minTime.set(cat, time);
      }
    }

    if (minTime.size < k) {
      out.push(-1);
    } else {
      const times = Array.from(minTime.values()).sort((x, y) => x - y);
      let sum = 0;
      for (let i = 0; i < k; i++) {
        sum += times[i];
      }
      out.push(sum);
    }
  }

  console.log(out.join('\n'));
}

solve();
