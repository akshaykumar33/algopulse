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
    const d = nextInt();
    const k = nextInt();

    const maxDays = n - d + 1;
    const diff = new Int32Array(maxDays + 2);

    for (let i = 0; i < k; i++) {
      const l = nextInt();
      const r = nextInt();
      const startS = Math.max(1, l - d + 1);
      const endS = Math.min(maxDays, r);
      if (startS <= endS) {
        diff[startS]++;
        diff[endS + 1]--;
      }
    }

    let cur = 0;
    let maxOverlap = -1;
    let minOverlap = 1e9;
    let bestBro = 1;
    let bestMom = 1;

    for (let s = 1; s <= maxDays; s++) {
      cur += diff[s];
      if (cur > maxOverlap) {
        maxOverlap = cur;
        bestBro = s;
      }
      if (cur < minOverlap) {
        minOverlap = cur;
        bestMom = s;
      }
    }

    out.push(`${bestBro} ${bestMom}`);
  }

  console.log(out.join('\n'));
}

solve();

