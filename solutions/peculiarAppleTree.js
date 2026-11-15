const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const depth = new Int32Array(n + 1);
  const depthCount = new Int32Array(n + 1);
  depth[1] = 0;
  depthCount[0] = 1;

  for (let i = 2; i <= n; i++) {
    const p = parseInt(input[ptr++], 10);
    depth[i] = depth[p] + 1;
    depthCount[depth[i]]++;
  }

  let ans = 0;
  for (let d = 0; d <= n; d++) {
    ans += depthCount[d] % 2;
  }
  console.log(ans);
}

solve();
