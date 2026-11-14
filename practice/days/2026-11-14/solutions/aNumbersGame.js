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
    const r = nextInt();
    const c = nextInt();
    if (r === 1) {
      out.push(1);
      continue;
    }
    if (c === 1) {
      out.push(-1);
      continue;
    }
    let cand = r;
    let steps = 1;
    while (cand > 1) {
      cand = Math.ceil(cand / c);
      steps++;
    }
    out.push(steps);
  }
  console.log(out.join('\n'));
}

solve();
