const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (input.length === 0 || isNaN(input[0])) return;
  const n = input[0];
  const digits = input.slice(1, n + 1);
  const cnt = new Int32Array(10);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    cnt[digits[i]]++;
    sum += digits[i];
  }
  if (cnt[0] === 0) {
    console.log(-1);
    return;
  }
  const rem = sum % 3;
  if (rem === 1) {
    let removed = false;
    for (const d of [1, 4, 7]) {
      if (cnt[d] > 0) { cnt[d]--; removed = true; break; }
    }
    if (!removed) {
      let needed = 2;
      for (const d of [2, 5, 8]) {
        while (cnt[d] > 0 && needed > 0) { cnt[d]--; needed--; }
      }
      if (needed > 0) { console.log(-1); return; }
    }
  } else if (rem === 2) {
    let removed = false;
    for (const d of [2, 5, 8]) {
      if (cnt[d] > 0) { cnt[d]--; removed = true; break; }
    }
    if (!removed) {
      let needed = 2;
      for (const d of [1, 4, 7]) {
        while (cnt[d] > 0 && needed > 0) { cnt[d]--; needed--; }
      }
      if (needed > 0) { console.log(-1); return; }
    }
  }
  let allZero = true;
  for (let d = 1; d <= 9; d++) {
    if (cnt[d] > 0) { allZero = false; break; }
  }
  if (allZero) {
    console.log(0);
    return;
  }
  let res = '';
  for (let d = 9; d >= 0; d--) {
    if (cnt[d] > 0) res += String(d).repeat(cnt[d]);
  }
  console.log(res);
}

solve();
