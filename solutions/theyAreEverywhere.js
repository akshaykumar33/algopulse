const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;

  const n = Number(input[0]);
  const s = input[1];

  const allChars = new Set(s);
  const totalDistinct = allChars.size;

  const count = new Map();
  let distinctInWindow = 0;
  let minLen = n;
  let l = 0;

  for (let r = 0; r < n; r++) {
    const ch = s[r];
    const c = count.get(ch) || 0;
    if (c === 0) distinctInWindow++;
    count.set(ch, c + 1);

    while (distinctInWindow === totalDistinct) {
      const len = r - l + 1;
      if (len < minLen) minLen = len;

      const leftChar = s[l];
      const lc = count.get(leftChar) - 1;
      if (lc === 0) {
        count.delete(leftChar);
        distinctInWindow--;
      } else {
        count.set(leftChar, lc);
      }
      l++;
    }
  }

  console.log(minLen);
}

solve();
