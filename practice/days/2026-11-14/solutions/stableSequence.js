const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
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
    let maxVal = -1;
    let allEqual = true;
    let firstVal = -1;
    let lastVal = -1;
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      if (i === 0) firstVal = v;
      else if (v !== firstVal) allEqual = false;
      if (v > maxVal) maxVal = v;
      if (i === n - 1) lastVal = v;
    }
    if (allEqual) {
      out.push(0);
    } else if (lastVal === maxVal) {
      out.push(1);
    } else {
      out.push(2);
    }
  }
  console.log(out.join('\n'));
}

solve();
