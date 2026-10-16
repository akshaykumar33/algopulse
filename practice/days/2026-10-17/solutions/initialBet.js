const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length < 5 || input[0] === '') return;
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    sum += Number(input[i]);
  }
  const out = [];
  if (sum > 0 && sum % 5 === 0) {
    out.push(sum / 5);
  } else {
    out.push(-1);
  }
  console.log(out.join('\n'));
}

solve();
