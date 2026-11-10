const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const p = parseInt(input[ptr++], 10);

  const to = new Int32Array(n + 1);
  const diam = new Int32Array(n + 1);
  const inDeg = new Int32Array(n + 1);
  const outDeg = new Int32Array(n + 1);

  for (let i = 0; i < p; i++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    to[a] = b;
    diam[a] = d;
    outDeg[a]++;
    inDeg[b]++;
  }

  const res = [];
  for (let i = 1; i <= n; i++) {
    if (inDeg[i] === 0 && outDeg[i] === 1) {
      let cur = i;
      let minD = 1000000000;
      while (outDeg[cur] === 1) {
        if (diam[cur] < minD) minD = diam[cur];
        cur = to[cur];
      }
      res.push([i, cur, minD]);
    }
  }

  res.sort((a, b) => a[0] - b[0]);
  console.log(res.length);
  for (let i = 0; i < res.length; i++) {
    console.log(`${res[i][0]} ${res[i][1]} ${res[i][2]}`);
  }
}

solve();

