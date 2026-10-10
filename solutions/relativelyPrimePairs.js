const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length < 2 || input[0] === '') return;
  const l = BigInt(input[0]);
  const r = BigInt(input[1]);

  const out = ['YES'];
  for (let i = l; i <= r; i += 2n) {
    out.push(`${i} ${i + 1n}`);
  }
  console.log(out.join('\n'));
}

solve();
