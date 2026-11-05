const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  let target = 1;
  const years = [];
  for (let i = 0; i < n; i++) {
    const val = parseInt(input[1 + i], 10);
    if (val === target) {
      years.push(2001 + i);
      target++;
    }
  }

  console.log(years.length);
  if (years.length > 0) {
    console.log(years.join(' '));
  }
}

solve();
