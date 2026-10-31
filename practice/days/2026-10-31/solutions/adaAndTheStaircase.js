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

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    let prev = 0;
    let ans = 0;

    for (let i = 0; i < n; i++) {
      const cur = nextInt();
      const diff = cur - prev;
      if (diff > k) {
        ans += Math.floor((diff - 1) / k);
      }
      prev = cur;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

