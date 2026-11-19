const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;

  let ans = 0;
  let cur = 0;
  const seen = new Set([0]);

  for (let i = 0; i < s.length; i++) {
    const d = s.charCodeAt(i) - 48;
    cur = (cur + d) % 3;
    if (seen.has(cur)) {
      ans++;
      seen.clear();
      seen.add(0);
      cur = 0;
    } else {
      seen.add(cur);
    }
  }

  console.log(ans);
}

solve();
