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
    const a = new Int32Array(n);
    let minIdx = 0;
    let allEqual = true;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      if (i > 0 && a[i] !== a[0]) allEqual = false;
      if (a[i] < a[minIdx]) minIdx = i;
    }
    if (allEqual) {
      out.push(a.join(' '));
      continue;
    }
    const minVal = a[minIdx];
    const rest = [];
    let skipped = false;
    for (let i = 0; i < n; i++) {
      if (!skipped && i === minIdx) {
        skipped = true;
        continue;
      }
      rest.push(a[i]);
    }
    rest.sort((x, y) => y - x);
    const res = [minVal];
    for (let i = 0; i < rest.length; i++) res.push(rest[i]);
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
