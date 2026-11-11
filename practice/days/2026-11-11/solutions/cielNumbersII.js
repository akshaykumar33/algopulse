const fs = require('fs');

function isCiel(s) {
  if (!s.length) return false;
  let c8 = 0;
  let c5 = 0;
  let c3 = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '8') c8++;
    else if (ch === '5') c5++;
    else if (ch === '3') c3++;
    else return false;
  }
  return c8 >= c5 && c5 >= c3;
}

function solve() {
  const raw = fs.readFileSync(0, 'utf-8');
  if (!raw.trim()) return;
  const lines = raw.split(/\r\n|\r|\n/);
  let idx = 0;
  while (idx < lines.length && !lines[idx].trim()) idx++;
  if (idx >= lines.length) return;
  const n = parseInt(lines[idx++].trim(), 10);
  let ans = 0;
  for (let i = 0; i < n && idx < lines.length; i++) {
    const line = lines[idx++].replace(/\s+$/, '');
    const sp = line.lastIndexOf(' ');
    const price = sp === -1 ? line : line.slice(sp + 1);
    if (isCiel(price)) ans++;
  }
  console.log(ans);
}

solve();
