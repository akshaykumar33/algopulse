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
    const minPos = new Array(k + 1).fill(Infinity);
    const maxPos = new Array(k + 1).fill(-Infinity);
    const present = new Uint8Array(k + 1);

    for (let i = 1; i <= n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      present[val] = 1;
      if (i < minPos[val]) minPos[val] = i;
      if (i > maxPos[val]) maxPos[val] = i;
    }

    const ans = new Array(k + 1).fill(0);
    let curMin = Infinity;
    let curMax = -Infinity;

    for (let val = k; val >= 1; val--) {
      if (minPos[val] < curMin) curMin = minPos[val];
      if (maxPos[val] > curMax) curMax = maxPos[val];
      if (present[val]) {
        ans[val] = 2 * (curMax - curMin + 1);
      }
    }

    const res = [];
    for (let val = 1; val <= k; val++) {
      res.push(ans[val]);
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
