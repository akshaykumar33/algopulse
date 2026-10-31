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
    let maxElem = 0;

    for (let i = 0; i < n; i++) {
      const v = nextInt();
      freq.set(v, (freq.get(v) || 0) + 1);
      if (v > maxElem) maxElem = v;
    }

    let c1 = 0;
    let maxFreq = 0;

    for (const [v, count] of freq.entries()) {
      if (count === 1) c1++;
      if (count > maxFreq) maxFreq = count;
    }

    if (c1 === 0) {
      out.push(0);
    } else if (c1 === 1) {
      if (freq.get(maxElem) === 1 && maxFreq <= 2) {
        out.push(2);
      } else {
        out.push(1);
      }
    } else {
      out.push(Math.floor((c1 + 1) / 2));
    }
  }

  console.log(out.join('\n'));
}

solve();

