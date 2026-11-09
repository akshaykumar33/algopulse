const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;
  let b = 0;
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      b++;
    } else if (s[i] === ')') {
      if (b > 0) {
        b--;
        ans += 2;
      }
    }
  }
  console.log(ans);
}

solve();
