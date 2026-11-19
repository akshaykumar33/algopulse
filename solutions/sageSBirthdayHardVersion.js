const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  const n = Number(input[0]);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = Number(input[i + 1]);
  }
  a.sort();

  const maxK = Math.floor((n - 1) / 2);

  function check(k) {
    if (k === 0) return true;
    const b = new Int32Array(n);
    for (let i = 0; i < k; i++) {
      b[2 * i + 1] = a[i];
      b[2 * i] = a[n - k - 1 + i];
    }
    b[2 * k] = a[n - 1];
    let rem = 2 * k + 1;
    for (let i = k; i < n - k - 1; i++) {
      b[rem++] = a[i];
    }
    let cnt = 0;
    for (let i = 1; i < 2 * k; i += 2) {
      if (b[i] < b[i - 1] && b[i] < b[i + 1]) cnt++;
    }
    return cnt === k;
  }

  let low = 0;
  let high = maxK;
  let best = 0;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (check(mid)) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const b = new Int32Array(n);
  for (let i = 0; i < best; i++) {
    b[2 * i + 1] = a[i];
    b[2 * i] = a[n - best - 1 + i];
  }
  b[2 * best] = a[n - 1];
  let rem = 2 * best + 1;
  for (let i = best; i < n - best - 1; i++) {
    b[rem++] = a[i];
  }

  let ans = 0;
  for (let i = 1; i < n - 1; i++) {
    if (b[i] < b[i - 1] && b[i] < b[i + 1]) ans++;
  }

  console.log(ans);
  console.log(b.join(' '));
}

solve();
