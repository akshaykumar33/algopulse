const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(parseInt(input[ptr++], 10));
    }

    let ok = true;
    const seen = new Set();
    const counts = new Map();

    for (let i = 0; i < n; i++) {
      const val = arr[i];
      counts.set(val, (counts.get(val) || 0) + 1);
      if (i > 0 && val !== arr[i - 1]) {
        if (seen.has(val)) {
          ok = false;
          break;
        }
      }
      seen.add(val);
    }

    if (ok) {
      const freqSet = new Set();
      for (const cnt of counts.values()) {
        if (freqSet.has(cnt)) {
          ok = false;
          break;
        }
        freqSet.add(cnt);
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
