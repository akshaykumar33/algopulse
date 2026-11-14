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
    let n = nextInt() + 1;
    while (true) {
      let temp = n;
      let cnt = 0;
      while (temp > 0) {
        if (temp % 10 === 3) cnt++;
        temp = Math.floor(temp / 10);
      }
      if (cnt >= 3) {
        out.push(n);
        break;
      }
      n++;
    }
  }
  console.log(out.join('\n'));
}

solve();
