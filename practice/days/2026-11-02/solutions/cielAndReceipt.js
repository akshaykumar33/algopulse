const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let start = pos;
    while (pos < buf.length && buf.charCodeAt(pos) > 32) pos++;
    return parseInt(buf.slice(start, pos), 10);
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let p = nextInt();
    let ans = Math.floor(p / 2048);
    let rem = p % 2048;
    while (rem > 0) {
      ans += rem & 1;
      rem >>= 1;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

