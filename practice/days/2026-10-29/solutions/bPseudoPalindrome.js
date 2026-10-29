const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }
    a.sort();

    if ((n & 1) === 0) {
      let ok = true;
      for (let i = 0; i < n; i += 2) {
        if (a[i + 1] - a[i] > d) {
          ok = false;
          break;
        }
      }
      out.push(ok ? 'YES' : 'NO');
    } else {
      const pairs = (n - 1) / 2;
      const pref = new Uint8Array(pairs + 1);
      pref[0] = 1;
      for (let i = 0; i < pairs; i++) {
        if (pref[i] && a[2 * i + 1] - a[2 * i] <= d) {
          pref[i + 1] = 1;
        } else {
          break;
        }
      }

      const suff = new Uint8Array(pairs + 1);
      suff[pairs] = 1;
      for (let i = pairs - 1; i >= 0; i--) {
        if (suff[i + 1] && a[2 * i + 2] - a[2 * i + 1] <= d) {
          suff[i] = 1;
        } else {
          break;
        }
      }

      let ok = false;
      for (let k = 0; k <= pairs; k++) {
        if (pref[k] && suff[k]) {
          ok = true;
          break;
        }
      }
      out.push(ok ? 'YES' : 'NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
