const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const [xStr, yStr] = input.split(/\s+/);
  const x = parseInt(xStr, 10);
  const y = parseInt(yStr, 10);

  if (y <= 0) {
    console.log('No');
    return;
  }

  if (y === 1) {
    console.log(x === 0 ? 'Yes' : 'No');
    return;
  }

  if (x >= y - 1 && (x - (y - 1)) % 2 === 0) {
    console.log('Yes');
  } else {
    console.log('No');
  }
}

solve();
