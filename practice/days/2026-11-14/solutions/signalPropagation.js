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
  const stack = new Int32Array(600010);
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let top = 0;
    let ans = 0;
    for (let j = 0; j < n; j++) {
      const val = nextInt();
      while (top > 0 && stack[top - 1] < val) {
        top -= 2;
      }
      const l = top === 0 ? -1 : stack[top - 2];
      const dist = j - (l + 1);
      if (dist > ans) ans = dist;
      stack[top++] = j;
      stack[top++] = val;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
