const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const x = [];
    for (let j = 0; j < n; j++) {
      x.push(parseInt(input[ptr++], 10));
    }
    const y = [];
    for (let j = 0; j < n; j++) {
      y.push(parseInt(input[ptr++], 10));
    }

    let ans = -1;
    for (let i = 0; i < n; i++) {
      const p = x[i];
      const list = [];
      for (let j = 0; j < n; j++) {
        list.push([Math.abs(x[j] - p), x[j]]);
      }
      list.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
      });

      let match = true;
      for (let j = 0; j < n; j++) {
        if (list[j][1] !== y[j]) {
          match = false;
          break;
        }
      }

      if (match) {
        ans = i + 1;
        break;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
