const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const s = parseInt(input[1], 10);

  if (s >= 2 * n) {
    const arr = new Array(n).fill(1);
    arr[n - 1] = s - (n - 1);
    console.log('YES');
    console.log(arr.join(' '));
    console.log(n);
  } else {
    console.log('NO');
  }
}

solve();
