const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);

  const fib = [0n, 1n, 2n];
  while (fib[fib.length - 1] <= 2000000000000000000n) {
    const len = fib.length;
    fib.push(fib[len - 1] + fib[len - 2]);
  }

  const out = [];

  for (let t = 0; t < T; t++) {
    const N = BigInt(input[ptr++]);
    let low = 1, high = fib.length - 2, ans = high;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (fib[mid + 1] - 1n >= N) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
