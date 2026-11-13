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
    const m = nextInt();
    const k = nextInt();

    const q = Math.floor(n / k);
    const r = n % k;

    const maxAllowed = q + 1;
    let countMax = 0;
    let ok = true;

    for (let i = 0; i < m; i++) {
      const a = nextInt();
      if (a > maxAllowed) {
        ok = false;
      } else if (a === maxAllowed) {
        countMax++;
      }
    }

    if (!ok || countMax > r) {
      out.push('NO');
    } else {
      out.push('YES');
    }
  }

  console.log(out.join('\n'));
}

solve();
