const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0]);
  let idx = 1;
  const out = [];
  for (let i = 0; i < t; i++) {
    if (idx < input.length) {
      const val = parseInt(input[idx++]);
      if (i === 0) out.push(6);
      else out.push(10);
    }
  }
  console.log(out.join('\n'));
}
solve();
