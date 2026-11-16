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
    const p = nextInt();
    const k = nextInt();
    if (n === null) break;

    const r = p % k;
    const q = Math.floor(n / k);
    const rem = n % k;

    const fullRems = Math.min(r, rem);
    const shortRems = Math.max(0, r - rem);

    let ans = fullRems * (q + 1) + shortRems * q;
    ans += Math.floor(p / k) + 1;

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
