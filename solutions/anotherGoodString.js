const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const q = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    let maxLen = 1;
    let curLen = 1;
    for (let i = 1; i < n; i++) {
      if (s[i] === s[i - 1]) {
        curLen++;
      } else {
        curLen = 1;
      }
      if (curLen > maxLen) {
        maxLen = curLen;
      }
    }

    let lastChar = s[n - 1];
    let suffRun = curLen;

    const res = [maxLen];

    for (let j = 0; j < q; j++) {
      const ch = tokens[ptr++];
      if (ch === lastChar) {
        suffRun++;
      } else {
        lastChar = ch;
        suffRun = 1;
      }
      if (suffRun > maxLen) {
        maxLen = suffRun;
      }
      res.push(maxLen);
    }

    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
