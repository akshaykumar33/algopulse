const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;

  const n = s.length;
  let totalW = 0n;
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === 'v' && s[i + 1] === 'v') {
      totalW++;
    }
  }

  let curW = 0n;
  let ans = 0n;

  for (let i = 0; i < n; i++) {
    if (i > 0 && s[i] === 'v' && s[i - 1] === 'v') {
      curW++;
    } else if (s[i] === 'o') {
      ans += curW * (totalW - curW);
    }
  }

  console.log(ans.toString());
}

solve();

