const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf.charCodeAt(pos) > 32) {
      res = res * 10 + (buf.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }
  let t = nextInt();
  if (t === null) return;
  let out = [];
  while (t--) {
    let n = nextInt();
    let q = nextInt();
    let cur = 0;
    let ans = 0;
    for (let i = 0; i < q; i++) {
      let f = nextInt();
      let d = nextInt();
      ans += Math.abs(cur - f) + Math.abs(f - d);
      cur = d;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
