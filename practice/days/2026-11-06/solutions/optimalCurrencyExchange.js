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
  const d = nextInt();
  const e = nextInt();

  const euro5 = 5 * e;
  let ans = n;
  const maxEuro = Math.min(Math.floor(n / euro5), d);

  for (let y = 0; y <= maxEuro; y++) {
    const rem = n - y * euro5;
    const cur = rem % d;
    if (cur < ans) {
      ans = cur;
      if (ans === 0) break;
    }
  }

  console.log(ans);
}

solve();

