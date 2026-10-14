const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];
  for (let i = 0; i < t; i++) {
    if (idx >= input.length) break;
    const n = parseInt(input[idx++], 10);
    const arr = input[idx++].trim().split(/\s+/).map(Number);
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += arr[j];
    }
    if (sum % 2 !== 0) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
