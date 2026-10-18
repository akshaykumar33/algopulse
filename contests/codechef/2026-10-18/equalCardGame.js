const fs = require('fs');

function solve() {
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
  for (let i = 0; i < t; i++) {
    const k = nextInt();
    if (k === null) break;
    out.push(52 % k);
  }

  console.log(out.join('\n'));
}

solve();
