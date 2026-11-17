const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(n);
  const cnt = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    const x = parseInt(tokens[ptr++], 10);
    a[i] = x;
    cnt[x]++;
  }

  const missing = [];
  for (let i = 1; i <= n; i++) {
    if (cnt[i] === 0) missing.push(i);
  }

  let mPtr = 0;
  const kept = new Uint8Array(n + 1);
  let changes = 0;

  for (let i = 0; i < n; i++) {
    const x = a[i];
    if (cnt[x] > 1) {
      if (mPtr < missing.length && missing[mPtr] < x) {
        a[i] = missing[mPtr++];
        cnt[x]--;
        changes++;
      } else {
        if (!kept[x]) {
          kept[x] = 1;
        } else {
          a[i] = missing[mPtr++];
          cnt[x]--;
          changes++;
        }
      }
    }
  }

  const out = [];
  out.push(changes);
  out.push(a.join(' '));
  console.log(out.join('\n'));
}

solve();
