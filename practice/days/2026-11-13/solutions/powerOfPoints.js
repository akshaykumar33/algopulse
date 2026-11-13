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
    const x = new Int32Array(n);
    const p = new Int32Array(n);

    for (let i = 0; i < n; i++) {
      x[i] = nextInt();
      p[i] = i;
    }

    p.sort((a, b) => x[a] - x[b]);

    const pref = new BigInt64Array(n + 1);
    for (let i = 0; i < n; i++) {
      pref[i + 1] = pref[i] + BigInt(x[p[i]]);
    }

    const ans = new Array(n);
    const bn = BigInt(n);

    for (let i = 0; i < n; i++) {
      const v = BigInt(x[p[i]]);
      const bi = BigInt(i);
      const left = bi * v - pref[i];
      const right = (pref[n] - pref[i + 1]) - (bn - 1n - bi) * v;
      ans[p[i]] = (left + right + bn).toString();
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
