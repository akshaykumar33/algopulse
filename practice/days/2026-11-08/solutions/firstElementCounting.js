const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const vals = new Int32Array(n);
    const order = new Int32Array(n);

    for (let i = 0; i < n; i++) {
      vals[i] = parseInt(tokens[ptr++], 10);
      order[i] = i;
    }

    order.sort((i, j) => vals[i] - vals[j]);

    const ans = new Array(n);
    ans[order[0]] = -1;
    ans[order[n - 1]] = -1;

    for (let k = 1; k < n - 1; k++) {
      const vPrev = vals[order[k - 1]];
      const vCur = vals[order[k]];
      const vNext = vals[order[k + 1]];
      const left = Math.floor((vPrev + vCur) / 2) + 1;
      const right = Math.floor((vCur + vNext) / 2);
      ans[order[k]] = right >= left ? right - left + 1 : 0;
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
