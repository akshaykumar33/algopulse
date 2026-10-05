const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input[0] === undefined || input[0].trim() === '') return;
  const x = parseInt(input[0].trim(), 10);
  if (isNaN(x)) return;
  if (x >= 60) {
    console.log('YES');
  } else {
    console.log('NO');
  }
}

solve();
