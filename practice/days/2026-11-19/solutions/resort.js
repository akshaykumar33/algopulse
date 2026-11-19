const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  const n = Number(input[0]);
  const type = new Int32Array(n + 1);
  const a = new Int32Array(n + 1);
  const inDeg = new Int32Array(n + 1);

  let ptr = 1;
  for (let i = 1; i <= n; i++) {
    type[i] = Number(input[ptr++]);
  }
  for (let i = 1; i <= n; i++) {
    const v = Number(input[ptr++]);
    a[i] = v;
    if (v !== 0) {
      inDeg[v]++;
    }
  }

  let bestPath = [];
  for (let i = 1; i <= n; i++) {
    if (type[i] === 1) {
      const path = [i];
      let cur = i;
      while (a[cur] !== 0 && inDeg[a[cur]] === 1) {
        cur = a[cur];
        path.push(cur);
      }
      if (path.length > bestPath.length) {
        bestPath = path;
      }
    }
  }

  bestPath.reverse();
  console.log(bestPath.length);
  console.log(bestPath.join(' '));
}

solve();
