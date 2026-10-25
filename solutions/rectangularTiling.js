const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];
  for (let i = 0; i < t && idx < input.length; i++) {
    const w = parseInt(input[idx++], 10);
    const l = parseInt(input[idx++], 10);
    if ((w & 1) && (l & 1)) {
      out.push('NO');
    } else {
      out.push('YES');
    }
  }
  console.log(out.join('\n'));
}

solve();
