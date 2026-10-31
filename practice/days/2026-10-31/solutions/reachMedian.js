const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const s = BigInt(tokens[ptr++]);

  const a = [];
  for (let i = 0; i < n; i++) {
    a.push(BigInt(tokens[ptr++]));
  }

  a.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));

  const mid = Math.floor(n / 2);
  let ans = 0n;

  if (a[mid] < s) {
    for (let i = mid; i < n; i++) {
      if (a[i] < s) {
        ans += s - a[i];
      }
    }
  } else if (a[mid] > s) {
    for (let i = 0; i <= mid; i++) {
      if (a[i] > s) {
        ans += a[i] - s;
      }
    }
  }

  console.log(ans.toString());
}

solve();
