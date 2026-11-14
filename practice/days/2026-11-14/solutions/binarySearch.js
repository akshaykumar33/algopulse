const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const x = parseInt(input[1], 10);
  const pos = parseInt(input[2], 10);

  const MOD = 1000000007n;

  let left = 0;
  let right = n;
  let less = 0;
  let greater = 0;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (mid <= pos) {
      if (mid < pos) less++;
      left = mid + 1;
    } else {
      greater++;
      right = mid;
    }
  }

  const availLess = x - 1;
  const availGreater = n - x;

  if (less > availLess || greater > availGreater) {
    console.log(0);
    return;
  }

  let ans = 1n;
  for (let i = 0; i < less; i++) {
    ans = (ans * BigInt(availLess - i)) % MOD;
  }
  for (let i = 0; i < greater; i++) {
    ans = (ans * BigInt(availGreater - i)) % MOD;
  }

  const rem = n - 1 - less - greater;
  for (let i = 1; i <= rem; i++) {
    ans = (ans * BigInt(i)) % MOD;
  }

  console.log(ans.toString());
}

solve();
