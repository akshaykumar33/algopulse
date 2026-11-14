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
    const a = new Int32Array(n);
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    for (let i = 0; i < n; i++) b[i] = nextInt();

    let m1 = 0, m2 = -1;
    for (let i = 1; i < n; i++) {
      if (a[i] > a[m1]) {
        m2 = m1;
        m1 = i;
      } else if (m2 === -1 || a[i] > a[m2]) {
        m2 = i;
      }
    }

    let win = false;
    for (let x = 0; x < n; x++) {
      const aliceScore = Math.max(a[x], b[x]);
      const bobCard = x === m1 ? m2 : m1;
      const bobScore = Math.max(a[bobCard], b[bobCard]);
      if (aliceScore > bobScore) {
        win = true;
        break;
      }
    }

    out.push(win ? 'Yes' : 'No');
  }
  console.log(out.join('\n'));
}

solve();
