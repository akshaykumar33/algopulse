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
    const k = nextInt();
    if (k === null) break;

    let stems = 1;
    let ok = true;

    for (let i = 0; i < k; i++) {
      const leaves = nextInt();
      if (!ok) continue;

      if (leaves > stems) {
        ok = false;
        continue;
      }

      stems = (stems - leaves) * 2;
      if (stems > 1000000) stems = 1000000;
    }

    if (ok && stems === 0) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();
