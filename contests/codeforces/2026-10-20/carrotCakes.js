const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length < 4 || input[0] === '') return;
  const [n, t, k, d] = input.map(Number);
  const out = [];
  const batches = Math.ceil(n / k);
  if (d + t < batches * t) {
    out.push('YES');
  } else {
    out.push('NO');
  }
  console.log(out.join('\n'));
}

solve();
