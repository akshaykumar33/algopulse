const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const k = n + m + 1;

    const a = new Int32Array(k);
    for (let i = 0; i < k; i++) a[i] = parseInt(tokens[ptr++], 10);
    const b = new Int32Array(k);
    for (let i = 0; i < k; i++) b[i] = parseInt(tokens[ptr++], 10);

    let totalPrefA = 0;
    for (let i = 0; i < k; i++) {
      if (a[i] > b[i]) totalPrefA++;
    }

    const ans = new Array(k);

    if (totalPrefA > n) {
      let countA = 0;
      let p = -1;
      for (let i = 0; i < k; i++) {
        if (a[i] > b[i]) {
          countA++;
          if (countA === n + 1) {
            p = i;
            break;
          }
        }
      }

      let baseSum = 0n;
      countA = 0;
      for (let i = 0; i < k; i++) {
        if (a[i] > b[i] && countA < n) {
          countA++;
          baseSum += BigInt(a[i]);
        } else {
          baseSum += BigInt(b[i]);
        }
      }

      const diff = BigInt(a[p]) - BigInt(b[p]);

      for (let i = 0; i < k; i++) {
        if (a[i] > b[i] && i < p) {
          ans[i] = (baseSum - BigInt(a[i]) + diff).toString();
        } else {
          ans[i] = (baseSum - BigInt(b[i])).toString();
        }
      }
    } else {
      let countB = 0;
      let p = -1;
      for (let i = 0; i < k; i++) {
        if (b[i] > a[i]) {
          countB++;
          if (countB === m + 1) {
            p = i;
            break;
          }
        }
      }

      let baseSum = 0n;
      countB = 0;
      for (let i = 0; i < k; i++) {
        if (b[i] > a[i] && countB < m) {
          countB++;
          baseSum += BigInt(b[i]);
        } else {
          baseSum += BigInt(a[i]);
        }
      }

      const diff = BigInt(b[p]) - BigInt(a[p]);

      for (let i = 0; i < k; i++) {
        if (b[i] > a[i] && i < p) {
          ans[i] = (baseSum - BigInt(b[i]) + diff).toString();
        } else {
          ans[i] = (baseSum - BigInt(a[i])).toString();
        }
      }
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
