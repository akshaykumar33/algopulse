const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const k = parseInt(input, 10);
  if (k % 2 !== 0) {
    console.log(-1);
    return;
  }
  const out = [];
  for (let z = 0; z < k; z++) {
    for (let y = 0; y < k; y++) {
      let row = '';
      for (let x = 0; x < k; x++) {
        row += ((Math.floor(x / 2) + y + Math.floor(z / 2)) % 2 === 0) ? 'b' : 'w';
      }
      out.push(row);
    }
    if (z < k - 1) out.push('');
  }
  console.log(out.join('\n'));
}

solve();
