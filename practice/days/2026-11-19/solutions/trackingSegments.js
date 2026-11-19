const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const m = Number(input[ptr++]);

    const segL = new Int32Array(m);
    const segR = new Int32Array(m);
    for (let i = 0; i < m; i++) {
      segL[i] = Number(input[ptr++]);
      segR[i] = Number(input[ptr++]);
    }

    const q = Number(input[ptr++]);
    const queries = new Int32Array(q);
    for (let i = 0; i < q; i++) {
      queries[i] = Number(input[ptr++]);
    }

    function check(k) {
      const arr = new Uint8Array(n + 1);
      for (let i = 0; i < k; i++) {
        arr[queries[i]] = 1;
      }
      const pref = new Int32Array(n + 1);
      for (let i = 1; i <= n; i++) {
        pref[i] = pref[i - 1] + arr[i];
      }

      for (let j = 0; j < m; j++) {
        const ones = pref[segR[j]] - pref[segL[j] - 1];
        const len = segR[j] - segL[j] + 1;
        if (ones > (len >> 1)) {
          return true;
        }
      }

      return false;
    }

    let low = 1;
    let high = q;
    let best = -1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (check(mid)) {
        best = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    out.push(best);
  }

  console.log(out.join('\n'));
}

solve();
