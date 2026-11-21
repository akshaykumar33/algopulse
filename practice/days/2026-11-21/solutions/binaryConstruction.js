const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    if (n === 2) out.push('01');
    else if (n === 3) out.push('001');
    else out.push('0' + '1'.repeat(n - 2) + '0');
  }
  console.log(out.join('\n'));
}
solve();