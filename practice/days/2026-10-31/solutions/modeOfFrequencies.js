const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const freq = new Map();
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      freq.set(v, (freq.get(v) || 0) + 1);
    }

    const countOfFreq = new Map();
    for (const f of freq.values()) {
      countOfFreq.set(f, (countOfFreq.get(f) || 0) + 1);
    }

    let bestFreq = 0;
    let maxCount = -1;

    for (const [f, cnt] of countOfFreq.entries()) {
      if (cnt > maxCount || (cnt === maxCount && f < bestFreq)) {
        maxCount = cnt;
        bestFreq = f;
      }
    }

    out.push(bestFreq);
  }

  console.log(out.join('\n'));
}

solve();

