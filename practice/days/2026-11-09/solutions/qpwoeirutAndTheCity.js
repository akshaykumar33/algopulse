const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const h = new Array(n);
    for (let i = 0; i < n; i++) {
      h[i] = BigInt(tokens[ptr++]);
    }

    function cost(i) {
      const maxAdj = h[i - 1] > h[i + 1] ? h[i - 1] : h[i + 1];
      const req = maxAdj + 1n - h[i];
      return req > 0n ? req : 0n;
    }

    if (n % 2 !== 0) {
      let total = 0n;
      for (let i = 1; i < n - 1; i += 2) {
        total += cost(i);
      }
      out.push(total.toString());
    } else {
      const m = (n - 2) / 2;
      const pref = new Array(m + 1);
      pref[0] = 0n;
      for (let i = 1; i <= m; i++) {
        pref[i] = pref[i - 1] + cost(2 * i - 1);
      }

      const suff = new Array(m + 1);
      suff[0] = 0n;
      for (let i = 1; i <= m; i++) {
        suff[i] = suff[i - 1] + cost(n - 2 * i);
      }

      let minCost = pref[m];
      for (let j = 0; j <= m; j++) {
        const cur = pref[j] + suff[m - j];
        if (cur < minCost) {
          minCost = cur;
        }
      }
      out.push(minCost.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
