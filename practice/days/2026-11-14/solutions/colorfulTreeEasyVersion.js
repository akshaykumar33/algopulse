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
    const deg = new Int32Array(n + 1);
    for (let i = 0; i < n - 1; i++) {
      const u = nextInt(), v = nextInt();
      deg[u]++;
      deg[v]++;
    }

    let leaves = 0;
    for (let i = 1; i <= n; i++) {
      if (deg[i] === 1) leaves++;
    }

    out.push(2 * n + leaves);
  }
  console.log(out.join('\n'));
}

solve();
