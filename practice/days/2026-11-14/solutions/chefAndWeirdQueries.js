const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
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
    const y = nextInt();
    let ans = 0;
    const limit = y < 700 ? y : 700;
    for (let a = 1; a <= limit; a++) {
      const diff = y - a;
      if (diff > 0) {
        ans += Math.floor(Math.sqrt(diff));
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
