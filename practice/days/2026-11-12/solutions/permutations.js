const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  let m = BigInt(tokens[ptr++]);

  const ans = new Array(n);
  let left = 0;
  let right = n - 1;

  for (let i = 1; i < n; i++) {
    const ways = 1n << BigInt(n - i - 1);
    if (m <= ways) {
      ans[left++] = i;
    } else {
      ans[right--] = i;
      m -= ways;
    }
  }
  ans[left] = n;

  console.log(ans.join(' '));
}

solve();
