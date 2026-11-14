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
  const n = nextInt();
  if (n === null) return;
  const q = nextInt();
  const f = new Int32Array(n + 2);
  const pref = new Int32Array(n + 2);
  let total = 0;
  for (let i = 1; i <= n; i++) {
    f[i] = nextInt();
    pref[i] = pref[i - 1] ^ f[i];
    total ^= f[i];
  }
  f[n + 1] = total;
  pref[n + 1] = 0;
  const period = n + 1;
  const out = [];
  for (let i = 0; i < q; i++) {
    const k = nextInt();
    const rem = k % period;
    out.push(pref[rem]);
  }
  console.log(out.join('\n'));
}

solve();
