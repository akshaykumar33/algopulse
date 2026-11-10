const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const t = parseInt(tokens[0], 10);
  const out = [];

  for (let i = 1; i <= t; i++) {
    const s = tokens[i];
    let maxLen = 0;
    let curLen = 0;
    let lastChar = '';

    for (let j = 0; j < s.length; j++) {
      const c = s[j];
      if (c === '=') continue;
      if (c === lastChar) {
        curLen++;
      } else {
        lastChar = c;
        curLen = 1;
      }
      if (curLen > maxLen) {
        maxLen = curLen;
      }
    }

    out.push(maxLen + 1);
  }

  console.log(out.join('\n'));
}

solve();
