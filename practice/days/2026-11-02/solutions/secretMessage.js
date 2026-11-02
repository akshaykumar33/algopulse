const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  const len = input.length;
  function nextToken() {
    while (pos < len && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= len) return null;
    const start = pos;
    while (pos < len && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }
  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const k = parseInt(nextToken(), 10);
    const mask = new Int32Array(n);
    for (let i = 0; i < k; i++) {
      const str = nextToken();
      for (let j = 0; j < n; j++) {
        mask[j] |= (1 << (str.charCodeAt(j) - 97));
      }
    }

    const divs = [];
    for (let d = 1; d <= n; d++) {
      if (n % d === 0) divs.push(d);
    }

    let res = '';
    for (let idx = 0; idx < divs.length; idx++) {
      const d = divs[idx];
      let possible = true;
      const base = new Array(d);
      for (let r = 0; r < d; r++) {
        let inter = (1 << 26) - 1;
        for (let j = r; j < n; j += d) {
          inter &= mask[j];
          if (inter === 0) break;
        }
        if (inter === 0) {
          possible = false;
          break;
        }
        const c = 31 - Math.clz32(inter & -inter);
        base[r] = String.fromCharCode(97 + c);
      }
      if (possible) {
        const periodStr = base.join('');
        const reps = n / d;
        res = periodStr.repeat(reps);
        break;
      }
    }
    out.push(res);
  }

  console.log(out.join('\n'));
}

solve();
