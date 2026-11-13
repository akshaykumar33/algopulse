const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let idx = 0;
  const t = parseInt(tokens[idx++], 10);
  const out = [];

  const prefEven = new Int32Array(26);
  const prefOdd = new Int32Array(26);
  const suffEven = new Int32Array(26);
  const suffOdd = new Int32Array(26);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[idx++], 10);
    const s = tokens[idx++];

    if (n % 2 === 0) {
      prefEven.fill(0);
      prefOdd.fill(0);
      for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        if (i % 2 === 0) {
          prefEven[c]++;
        } else {
          prefOdd[c]++;
        }
      }
      let maxE = 0;
      let maxO = 0;
      for (let c = 0; c < 26; c++) {
        if (prefEven[c] > maxE) maxE = prefEven[c];
        if (prefOdd[c] > maxO) maxO = prefOdd[c];
      }
      out.push(n - maxE - maxO);
    } else {
      prefEven.fill(0);
      prefOdd.fill(0);
      suffEven.fill(0);
      suffOdd.fill(0);

      for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        if (i % 2 === 0) {
          suffEven[c]++;
        } else {
          suffOdd[c]++;
        }
      }

      let ans = n;
      for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        if (i % 2 === 0) {
          suffEven[c]--;
        } else {
          suffOdd[c]--;
        }

        let maxE = 0;
        let maxO = 0;
        for (let k = 0; k < 26; k++) {
          const e = prefEven[k] + suffOdd[k];
          if (e > maxE) maxE = e;
          const o = prefOdd[k] + suffEven[k];
          if (o > maxO) maxO = o;
        }

        const curCost = n - maxE - maxO;
        if (curCost < ans) ans = curCost;

        if (i % 2 === 0) {
          prefEven[c]++;
        } else {
          prefOdd[c]++;
        }
      }

      out.push(ans);
    }
  }

  console.log(out.join('\n'));
}

solve();
