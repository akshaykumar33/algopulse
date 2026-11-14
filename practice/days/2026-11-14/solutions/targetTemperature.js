const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
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
    let maxVal = 0;
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      arr[i] = v;
      if (v > maxVal) maxVal = v;
    }

    const seen = new Set();
    let ok = true;
    for (let i = 0; i < n; i++) {
      if (arr[i] < maxVal) {
        if (seen.has(arr[i])) {
          ok = false;
          break;
        }
        seen.add(arr[i]);
      }
    }
    out.push(ok ? 'Yes' : 'No');
  }
  console.log(out.join('\n'));
}

solve();
