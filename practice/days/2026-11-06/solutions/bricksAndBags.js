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
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
    }

    a.sort();

    let ans = 0;

    for (let i = 2; i < n; i++) {
      const cur = (a[i] - a[0]) + (a[i] - a[i - 1]);
      if (cur > ans) ans = cur;
    }

    for (let j = 0; j <= n - 3; j++) {
      const cur = (a[n - 1] - a[j]) + (a[j + 1] - a[j]);
      if (cur > ans) ans = cur;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

