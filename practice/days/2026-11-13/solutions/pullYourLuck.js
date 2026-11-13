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
    const x = nextInt();
    const p = nextInt();

    const limit = Math.min(p, 2 * n);
    let ok = false;
    let sum = 0;

    for (let f = 1; f <= limit; f++) {
      sum = (sum + f) % n;
      if ((x + sum) % n === 0) {
        ok = true;
        break;
      }
    }

    if (ok) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();
