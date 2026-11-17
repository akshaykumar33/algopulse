const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const target = 'abacaba';
  const out = [];

  function countOccurrences(str) {
    let cnt = 0;
    for (let i = 0; i <= str.length - 7; i++) {
      if (str.slice(i, i + 7) === target) cnt++;
    }
    return cnt;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let found = false;

    for (let i = 0; i <= n - 7; i++) {
      let canPlace = true;
      for (let j = 0; j < 7; j++) {
        if (s[i + j] !== '?' && s[i + j] !== target[j]) {
          canPlace = false;
          break;
        }
      }
      if (!canPlace) continue;

      let cand = '';
      for (let k = 0; k < n; k++) {
        if (k >= i && k < i + 7) {
          cand += target[k - i];
        } else if (s[k] === '?') {
          cand += 'z';
        } else {
          cand += s[k];
        }
      }

      if (countOccurrences(cand) === 1) {
        out.push('Yes');
        out.push(cand);
        found = true;
        break;
      }
    }

    if (!found) {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();
