const fs = require('fs');
function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || lines[0] === '') return;
  const t = parseInt(lines[0]);
  const out = [];
  for (let i = 1; i <= t; i++) {
    if (i >= lines.length) break;
    const s = lines[i];
    let l = 0, r = s.length - 1;
    let ok = true;
    while (l < r) {
      if (s[l] !== '?' && s[r] !== '?' && s[l] !== s[r]) {
        ok = false;
        break;
      }
      l++;
      r--;
    }
    out.push(ok ? "YES" : "NO");
  }
  console.log(out.join('\n'));
}
solve();
