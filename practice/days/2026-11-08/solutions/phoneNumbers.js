const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 3 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const k = parseInt(tokens[1], 10);
  const s = tokens[2];

  const charSet = new Set();
  for (let i = 0; i < n; i++) {
    charSet.add(s[i]);
  }
  const chars = Array.from(charSet).sort();
  const minChar = chars[0];

  if (k > n) {
    let ans = s;
    while (ans.length < k) {
      ans += minChar;
    }
    console.log(ans);
    return;
  }

  const t = s.slice(0, k).split('');
  for (let i = k - 1; i >= 0; i--) {
    let nextChar = null;
    for (let c = 0; c < chars.length; c++) {
      if (chars[c] > t[i]) {
        nextChar = chars[c];
        break;
      }
    }
    if (nextChar !== null) {
      t[i] = nextChar;
      for (let j = i + 1; j < k; j++) {
        t[j] = minChar;
      }
      break;
    }
  }

  console.log(t.join(''));
}

solve();
