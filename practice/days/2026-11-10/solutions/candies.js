const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
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
  const pref = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    pref[i] = pref[i - 1] + nextInt();
  }

  const q = nextInt();
  const out = [];
  for (let i = 0; i < q; i++) {
    const l = nextInt();
    const r = nextInt();
    out.push(Math.floor((pref[r] - pref[l - 1]) / 10));
  }

  console.log(out.join('\n'));
}

solve();
