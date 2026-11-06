const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const k = nextInt();

  const s = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    s[i] = nextInt();
  }

  let ans = s[n - 1];
  const pairs = n - k;

  for (let i = 0; i < pairs; i++) {
    const sum = s[i] + s[2 * pairs - 1 - i];
    if (sum > ans) ans = sum;
  }

  console.log(ans);
}

solve();

