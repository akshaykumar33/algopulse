const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];
  for (let i = 0; i < t && idx < input.length; i++) {
    const n = parseInt(input[idx++], 10);
    const s = input[idx++];
    let c0 = 0, c1 = 0;
    for (let j = 0; j < s.length; j++) {
      if (s[j] === '0') c0++;
      else c1++;
    }
    out.push('0'.repeat(c0) + '1'.repeat(c1));
  }
  console.log(out.join('\n'));
}

solve();
