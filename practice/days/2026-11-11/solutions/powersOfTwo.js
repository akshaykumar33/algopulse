const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);

  const cnt = new Int32Array(31);
  let total = 0;
  for (let b = 0; b <= 30; b++) {
    if ((n & (1 << b)) !== 0) {
      cnt[b] = 1;
      total++;
    }
  }

  if (k < total || k > n) {
    console.log('NO');
    return;
  }

  for (let b = 30; b >= 1 && total < k; b--) {
    if (cnt[b] > 0) {
      const split = cnt[b] < k - total ? cnt[b] : k - total;
      cnt[b] -= split;
      cnt[b - 1] += 2 * split;
      total += split;
    }
  }

  const res = [];
  for (let b = 0; b <= 30; b++) {
    const val = 1 << b;
    for (let c = 0; c < cnt[b]; c++) {
      res.push(val);
    }
  }

  console.log('YES\n' + res.join(' '));
}

solve();
