const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) b[i] = nextInt();

    const c = new Int32Array(m);
    for (let j = 0; j < m; j++) c[j] = nextInt();

    const needed = new Map();
    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) {
        if (!needed.has(b[i])) needed.set(b[i], []);
        needed.get(b[i]).push(i + 1);
      }
    }

    const lastColor = c[m - 1];
    let lastPlank = -1;

    if (needed.has(lastColor) && needed.get(lastColor).length > 0) {
      lastPlank = needed.get(lastColor).pop();
    } else {
      for (let i = 0; i < n; i++) {
        if (b[i] === lastColor) {
          lastPlank = i + 1;
          break;
        }
      }
    }

    if (lastPlank === -1) {
      out.push('NO');
      continue;
    }

    const ans = new Int32Array(m);
    ans[m - 1] = lastPlank;

    for (let j = 0; j < m - 1; j++) {
      const col = c[j];
      if (needed.has(col) && needed.get(col).length > 0) {
        ans[j] = needed.get(col).pop();
      } else {
        ans[j] = lastPlank;
      }
    }

    let ok = true;
    for (const list of needed.values()) {
      if (list.length > 0) {
        ok = false;
        break;
      }
    }

    if (ok) {
      out.push('YES');
      out.push(ans.join(' '));
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
