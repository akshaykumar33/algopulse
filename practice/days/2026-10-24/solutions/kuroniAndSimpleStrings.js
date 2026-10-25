const fs = require('fs');

function solve() {
  const line = fs.readFileSync(0, 'utf-8').trim();
  if (!line) return;
  const s = line;
  let l = 0;
  let r = s.length - 1;
  const leftIdx = [];
  const rightIdx = [];

  while (l < r) {
    while (l < r && s[l] !== '(') l++;
    while (l < r && s[r] !== ')') r--;
    if (l < r) {
      leftIdx.push(l + 1);
      rightIdx.push(r + 1);
      l++;
      r--;
    }
  }

  if (leftIdx.length === 0) {
    console.log(0);
    return;
  }

  const all = leftIdx.concat(rightIdx.reverse());
  console.log(1);
  console.log(all.length);
  console.log(all.join(' '));
}

solve();
