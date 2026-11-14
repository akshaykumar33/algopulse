const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const a = [];
  for (let i = 0; i < n - 1; i++) a.push(parseInt(input[ptr++], 10));
  const b = [];
  for (let i = 0; i < n - 1; i++) b.push(parseInt(input[ptr++], 10));

  for (let first = 0; first <= 3; first++) {
    const t = [first];
    let ok = true;
    for (let i = 0; i < n - 1; i++) {
      let found = -1;
      for (let next = 0; next <= 3; next++) {
        if ((t[i] | next) === a[i] && (t[i] & next) === b[i]) {
          found = next;
          break;
        }
      }
      if (found === -1) {
        ok = false;
        break;
      }
      t.push(found);
    }
    if (ok) {
      console.log('YES');
      console.log(t.join(' '));
      return;
    }
  }
  console.log('NO');
}

solve();
