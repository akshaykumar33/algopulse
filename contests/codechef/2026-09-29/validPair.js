const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);

function solve() {
  const [a, b, c] = input;
  if (a === b || b === c || a === c) {
    console.log('YES');
  } else {
    console.log('NO');
  }
}

solve();
