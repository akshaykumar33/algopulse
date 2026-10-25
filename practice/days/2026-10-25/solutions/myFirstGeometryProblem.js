const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const s = input[idx++];
    const h = (s[0] === '1' ? 10 : 0) + (s[1] === '1' ? 10 : 0) + 1;
    const v = (s[2] === '1' ? 10 : 0) + (s[3] === '1' ? 10 : 0) + 1;
    out.push(h * v);
  }
  console.log(out.join('\n'));
}

solve();
