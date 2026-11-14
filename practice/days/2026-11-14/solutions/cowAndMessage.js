const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;
  const n = s.length;

  const cnt = new Array(26).fill(0);
  const pair = Array.from({ length: 26 }, () => new Array(26).fill(0));

  for (let i = 0; i < n; i++) {
    const c = s.charCodeAt(i) - 97;
    for (let prev = 0; prev < 26; prev++) {
      pair[prev][c] += cnt[prev];
    }
    cnt[c]++;
  }

  let ans = 0;
  for (let i = 0; i < 26; i++) {
    if (cnt[i] > ans) ans = cnt[i];
    for (let j = 0; j < 26; j++) {
      if (pair[i][j] > ans) ans = pair[i][j];
    }
  }
  console.log(ans);
}

solve();
