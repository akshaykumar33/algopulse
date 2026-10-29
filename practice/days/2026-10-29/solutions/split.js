const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    const totalFreq = new Map();

    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      a[i] = v;
      totalFreq.set(v, (totalFreq.get(v) || 0) + 1);
    }

    let possible = true;
    const limits = new Map();
    for (const [v, f] of totalFreq.entries()) {
      if (f % k !== 0) {
        possible = false;
        break;
      }
      limits.set(v, f / k);
    }

    if (!possible) {
      out.push('0');
      continue;
    }

    let ans = 0n;
    let l = 0;
    const curFreq = new Map();

    for (let r = 0; r < n; r++) {
      const v = a[r];
      const maxAllowed = limits.get(v);
      curFreq.set(v, (curFreq.get(v) || 0) + 1);

      while (curFreq.get(v) > maxAllowed) {
        const leftVal = a[l];
        curFreq.set(leftVal, curFreq.get(leftVal) - 1);
        l++;
      }
      ans += BigInt(r - l + 1);
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
