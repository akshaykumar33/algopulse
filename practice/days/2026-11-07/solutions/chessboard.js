const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  const cost0 = new Int32Array(4);
  const cost1 = new Int32Array(4);

  for (let p = 0; p < 4; p++) {
    for (let r = 0; r < n; r++) {
      const row = tokens[ptr++];
      for (let c = 0; c < n; c++) {
        const ch = row.charCodeAt(c);
        const exp0 = ((r + c) % 2 === 0) ? 48 : 49;
        if (ch !== exp0) cost0[p]++;
        else cost1[p]++;
      }
    }
  }

  let ans = 1e9;
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      let cur = cost0[i] + cost0[j];
      for (let k = 0; k < 4; k++) {
        if (k !== i && k !== j) cur += cost1[k];
      }
      if (cur < ans) ans = cur;
    }
  }

  console.log(ans);
}

solve();
