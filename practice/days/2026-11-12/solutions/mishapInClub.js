const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;

  let cur = 0;
  let mn = 0;
  let mx = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '+') cur++;
    else cur--;
    if (cur < mn) mn = cur;
    if (cur > mx) mx = cur;
  }

  console.log(mx - mn);
}

solve();
