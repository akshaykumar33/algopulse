const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) {
      pos++;
    }
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const q = nextInt();

    const a = new Uint8Array(n + 1);
    const pref1 = new Int32Array(n + 1);
    const prefAdj = new Int32Array(n + 1);

    for (let i = 1; i <= n; i++) {
      const val = nextInt();
      a[i] = val;
      pref1[i] = pref1[i - 1] + val;
      if (i > 1) {
        prefAdj[i - 1] = prefAdj[i - 2] + (a[i] === a[i - 1] ? 1 : 0);
      }
    }

    for (let qi = 0; qi < q; qi++) {
      const l = nextInt();
      const r = nextInt();
      const len = r - l + 1;

      if (len % 3 !== 0) {
        out.push('-1');
        continue;
      }

      const c1 = pref1[r] - pref1[l - 1];
      const c0 = len - c1;

      if (c0 % 3 !== 0 || c1 % 3 !== 0) {
        out.push('-1');
        continue;
      }

      const hasAdj = r > l ? (prefAdj[r - 1] - prefAdj[l - 1] > 0) : false;
      const baseOps = Math.floor(len / 3);

      if (hasAdj) {
        out.push(baseOps);
      } else {
        out.push(baseOps + 1);
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
