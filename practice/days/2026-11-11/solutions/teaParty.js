const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const w = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(n);
  const ans = new Int32Array(n);
  const order = new Array(n);

  let used = 0;
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(tokens[ptr++], 10);
    ans[i] = (a[i] + 1) >> 1;
    used += ans[i];
    order[i] = i;
  }

  if (used > w) {
    console.log(-1);
    return;
  }

  let rem = w - used;
  order.sort((i, j) => a[j] - a[i]);

  for (let k = 0; k < n && rem > 0; k++) {
    const idx = order[k];
    const add = Math.min(rem, a[idx] - ans[idx]);
    ans[idx] += add;
    rem -= add;
  }

  if (rem > 0) {
    console.log(-1);
    return;
  }

  console.log(Array.from(ans).join(' '));
}

solve();
