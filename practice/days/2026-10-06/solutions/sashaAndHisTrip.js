const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length < 2 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const v = parseInt(input[1], 10);

  let ans = 0;
  if (n - 1 <= v) {
    ans = n - 1;
  } else {
    ans = v;
    for (let i = 2; i <= n - v; i++) {
      ans += i;
    }
  }
  console.log(ans);
}

solve();
