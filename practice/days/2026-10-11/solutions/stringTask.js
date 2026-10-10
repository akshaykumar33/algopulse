const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const s = input.toLowerCase();
  const vowels = new Set(['a', 'o', 'y', 'e', 'u', 'i']);
  let res = '';
  for (let i = 0; i < s.length; i++) {
    if (!vowels.has(s[i])) {
      res += '.' + s[i];
    }
  }
  console.log(res);
}

solve();
