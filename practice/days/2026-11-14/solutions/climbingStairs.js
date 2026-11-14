const fs = require('fs');

function solve() {
  const MAX = 1000005;
  const MOD = 1000000007;
  const fib = new Int32Array(MAX + 1);
  fib[1] = 1;
  fib[2] = 2;
  for (let i = 3; i <= MAX; i++) {
    fib[i] = (fib[i - 1] + fib[i - 2]) % MOD;
  }

  function popcount(x) {
    let cnt = 0;
    while (x > 0) {
      cnt += (x & 1);
      x >>>= 1;
    }
    return cnt;
  }

  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const g = nextInt();
    const ways = fib[n];
    const ones = popcount(ways);
    out.push(ones === g ? 'CORRECT' : 'INCORRECT');
  }
  console.log(out.join('\n'));
}

solve();
