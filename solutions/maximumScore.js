const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    let count0 = 0;
    let count1 = 0;
    for (let i = 0; i < n; i++) {
      if (input[idx++] === '1') count1++;
      else count0++;
    }
    out.push(Math.min(count0, count1));
  }
  console.log(out.join('\n'));
}

solve();
