const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1;
    if (input.charCodeAt(pos) === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return sign * res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    let found = false;
    for (let i = 0; i < 4 && !found; i++) {
      for (let j = i + 1; j < 4 && !found; j++) {
        const diff = a[j] - a[i];
        if (diff % (j - i) !== 0) continue;
        const d = diff / (j - i);
        const a0 = a[i] - i * d;

        let mismatches = 0;
        for (let k = 0; k < n; k++) {
          if (a[k] !== a0 + k * d) {
            mismatches++;
            if (mismatches > 1) break;
          }
        }

        if (mismatches <= 1) {
          const res = [];
          for (let k = 0; k < n; k++) {
            res.push(a0 + k * d);
          }
          out.push(res.join(' '));
          found = true;
        }
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
