const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return;
  const s = lines[0];
  const t = lines[1];
  let i = s.length - 1;
  let j = t.length - 1;
  let common = 0;
  while (i >= 0 && j >= 0 && s[i] === t[j]) {
    common++;
    i--;
    j--;
  }
  console.log(s.length + t.length - 2 * common);
}

solve();
