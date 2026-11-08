const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const a = new Array(2 * n);
  for (let i = 0; i < 2 * n; i++) {
    a[i] = parseInt(input[i + 1], 10);
  }
  let ans = 0;
  for (let i = 0; i < 2 * n; i += 2) {
    let j = i + 1;
    while (a[j] !== a[i]) {
      j++;
    }
    while (j > i + 1) {
      const temp = a[j];
      a[j] = a[j - 1];
      a[j - 1] = temp;
      j--;
      ans++;
    }
  }
  console.log(ans);
}

solve();
