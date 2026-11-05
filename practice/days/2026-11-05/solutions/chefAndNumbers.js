const fs = require('fs');

function digitSum(n) {
  let s = 0;
  while (n > 0) {
    s += n % 10;
    n = Math.floor(n / 10);
  }
  return s;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);

  let ans = 0;
  const start = Math.max(1, n - 108);
  for (let x = start; x <= n; x++) {
    const s1 = digitSum(x);
    const s2 = digitSum(s1);
    if (x + s1 + s2 === n) {
      ans++;
    }
  }

  console.log(ans);
}

solve();
