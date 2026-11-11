const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const arr = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = parseInt(tokens[ptr++], 10);
  }

  let ans = 0;
  for (let i = 1; i < n; i++) {
    const u = arr[i - 1];
    const v = arr[i];
    if ((u === 2 && v === 3) || (u === 3 && v === 2)) {
      console.log('Infinite');
      return;
    }
    if ((u === 1 && v === 2) || (u === 2 && v === 1)) {
      ans += 3;
    } else if ((u === 1 && v === 3) || (u === 3 && v === 1)) {
      ans += 4;
    }
    if (i >= 2 && arr[i] === 2 && arr[i - 1] === 1 && arr[i - 2] === 3) {
      ans -= 1;
    }
  }

  console.log('Finite\n' + ans);
}

solve();
