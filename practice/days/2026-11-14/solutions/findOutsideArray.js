const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1;
    if (input.charCodeAt(pos) === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let minVal = Infinity, maxVal = -Infinity;
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      if (v < minVal) minVal = v;
      if (v > maxVal) maxVal = v;
    }

    if (maxVal > 0) {
      out.push(maxVal + ' ' + maxVal);
    } else if (minVal < 0) {
      out.push(minVal + ' ' + minVal);
    } else {
      out.push('-1');
    }
  }
  console.log(out.join('\n'));
}

solve();
