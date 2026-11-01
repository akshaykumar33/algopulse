const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = BigInt(tokens[ptr++]);
    }

    if (k >= 3) {
      out.push('0');
      continue;
    }

    arr.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    let ans = arr[0];
    for (let i = 0; i < n - 1; i++) {
      const d = arr[i + 1] - arr[i];
      if (d < ans) ans = d;
    }

    if (k === 1 || ans === 0n) {
      out.push(ans.toString());
      continue;
    }

    let foundZero = false;
    for (let i = 0; i < n && !foundZero; i++) {
      const ai = arr[i];
      for (let j = 0; j < i; j++) {
        const diff = ai - arr[j];
        if (diff < ans) ans = diff;
        if (ans === 0n) {
          foundZero = true;
          break;
        }

        let l = 0, r = n - 1, pos = n;
        while (l <= r) {
          const mid = (l + r) >> 1;
          if (arr[mid] >= diff) {
            pos = mid;
            r = mid - 1;
          } else {
            l = mid + 1;
          }
        }

        if (pos < n) {
          const sub = arr[pos] - diff;
          if (sub < ans) ans = sub;
        }
        if (pos > 0) {
          const sub = diff - arr[pos - 1];
          if (sub < ans) ans = sub;
        }

        if (ans === 0n) {
          foundZero = true;
          break;
        }
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
