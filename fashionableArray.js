const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;

    const count = new Map();
    let maxFreq = 0;
    for (let i = 0; i < n; i++) {
      const val = nextInt();
      const c = (count.get(val) || 0) + 1;
      count.set(val, c);
      if (c > maxFreq) maxFreq = c;
    }

    const ans = [];
    for (let k = 1; k <= maxFreq; k++) {
      const currentLevel = [];
      for (const [val, freq] of count.entries()) {
        if (freq >= k) {
          currentLevel.push(val);
        }
      }
      currentLevel.sort((a, b) => b - a);
      for (let i = 0; i < currentLevel.length; i++) {
        ans.push(currentLevel[i]);
      }
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
