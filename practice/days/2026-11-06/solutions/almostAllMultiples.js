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
    const x = nextInt();

    if (n % x !== 0) {
      out.push(-1);
      continue;
    }

    const p = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      p[i] = i;
    }

    p[1] = x;
    p[n] = 1;

    let cur = x;
    while (cur < n) {
      let nextStep = n;
      for (let f = 2; cur * f <= n; f++) {
        if (n % (cur * f) === 0) {
          nextStep = cur * f;
          break;
        }
      }
      p[cur] = nextStep;
      cur = nextStep;
    }

    const res = [];
    for (let i = 1; i <= n; i++) {
      res.push(p[i]);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

