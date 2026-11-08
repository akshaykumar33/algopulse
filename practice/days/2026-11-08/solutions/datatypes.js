const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const a = new Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(input[i + 1], 10);
  }
  a.sort((x, y) => x - y);
  for (let i = 1; i < n; i++) {
    if (a[i - 1] !== a[i] && 2 * a[i - 1] > a[i]) {
      console.log('YES');
      return;
    }
  }
  console.log('NO');
}

solve();
