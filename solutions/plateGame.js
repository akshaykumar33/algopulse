const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (input.length < 3) return;
  const [a, b, r] = input;
  if (2 * r <= a && 2 * r <= b) {
    console.log('First');
  } else {
    console.log('Second');
  }
}

solve();
