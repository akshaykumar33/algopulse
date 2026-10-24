const fs = require('fs');

function solve() {
  const fibs = [1n, 2n];
  const limit = 10n ** 101n;
  while (true) {
    const next = fibs[fibs.length - 1] + fibs[fibs.length - 2];
    fibs.push(next);
    if (next > limit) break;
  }

  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const out = [];
  while (true) {
    const s1 = nextToken();
    if (!s1) break;
    const s2 = nextToken();
    if (!s2) break;
    const a = BigInt(s1);
    const b = BigInt(s2);
    if (a === 0n && b === 0n) break;

    let cnt = 0;
    for (let i = 0; i < fibs.length; i++) {
      if (fibs[i] >= a && fibs[i] <= b) cnt++;
      else if (fibs[i] > b) break;
    }
    out.push(cnt);
  }

  console.log(out.join('\n'));
}

solve();
