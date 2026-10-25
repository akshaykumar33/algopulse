const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const f = [];
    for (let i = 0; i < n; i++) f.push(parseInt(input[idx++], 10));

    let gas = f[0];
    let dist = 0;
    for (let i = 1; i < n; i++) {
      if (gas === 0) break;
      gas--;
      dist++;
      gas += f[i];
    }
    out.push(dist + gas);
  }
  console.log(out.join('\n'));
}

solve();
