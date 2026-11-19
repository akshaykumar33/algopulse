const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  const n = Number(input[0]);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = Number(input[i + 1]);
  }

  let p = 0;
  const prefSet = new Set();
  while (p < n && !prefSet.has(a[p])) {
    prefSet.add(a[p]);
    p++;
  }

  if (p === n) {
    console.log(0);
    return;
  }

  let minLen = n - p;
  const curSet = new Set();

  for (let i = 0; i <= p; i++) {
    curSet.clear();
    for (let k = 0; k < i; k++) {
      curSet.add(a[k]);
    }

    let j = n - 1;
    while (j >= i && !curSet.has(a[j])) {
      curSet.add(a[j]);
      j--;
    }

    const removed = j - i + 1;
    if (removed < minLen) {
      minLen = removed;
    }
  }

  console.log(minLen);
}

solve();
