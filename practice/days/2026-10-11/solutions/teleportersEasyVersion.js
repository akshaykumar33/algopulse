const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let c = Number(input[ptr++]);
    const costs = [];
    for (let i = 1; i <= n; i++) {
      costs.push(i + Number(input[ptr++]));
    }
    costs.sort((a, b) => a - b);
    let ans = 0;
    for (let i = 0; i < n; i++) {
      if (c >= costs[i]) {
        c -= costs[i];
        ans++;
      } else {
        break;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
