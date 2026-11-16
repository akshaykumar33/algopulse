const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = nextToken();
    const n = parseInt(nextToken(), 10);

    let step = 0;
    for (let i = 0; i < s.length; i++) {
      step += (s[i] === 'T' ? 2 : 1);
    }

    const totalKeys = 12 * n;
    let ans = 0;
    for (let k = 1; k * step < totalKeys; k++) {
      ans += (totalKeys - k * step);
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
