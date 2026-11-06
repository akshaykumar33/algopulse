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
    const freq = new Map();
    for (let i = 0; i < n; i++) {
      const val = nextInt();
      freq.set(val, (freq.get(val) || 0) + 1);
    }

    let c1 = 0;
    let c2 = 0;

    for (const count of freq.values()) {
      if (count >= 2) {
        c2++;
      } else {
        c1++;
      }
    }

    const ans = c2 + Math.floor((c1 + 1) / 2);
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

