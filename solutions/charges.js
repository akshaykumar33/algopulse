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
    const n = parseInt(nextToken(), 10);
    const k = parseInt(nextToken(), 10);
    const sStr = nextToken();
    const arr = sStr.split('').map(x => x.charCodeAt(0) - 48);

    let dist = 0;
    for (let i = 0; i < n - 1; i++) {
      dist += (arr[i] === arr[i + 1] ? 2 : 1);
    }

    for (let q = 0; q < k; q++) {
      const p = parseInt(nextToken(), 10) - 1;
      if (p > 0) {
        if (arr[p] === arr[p - 1]) dist--;
        else dist++;
      }
      if (p < n - 1) {
        if (arr[p] === arr[p + 1]) dist--;
        else dist++;
      }
      arr[p] ^= 1;
      out.push(dist.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
