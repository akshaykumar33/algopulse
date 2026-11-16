const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextBigInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return BigInt(input.slice(start, pos));
  }

  const tVal = nextBigInt();
  if (tVal === null) return;
  const t = Number(tVal);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextBigInt();
    const m = nextBigInt();
    if (n === null || m === null) break;

    if (n > m) {
      out.push('-1');
      continue;
    }

    const ans = [n];
    for (let b = 0n; b <= 60n; b++) {
      const bit = 1n << b;
      if ((n & bit) === 0n) {
        const val = n | bit;
        if (val <= m) {
          ans.push(val);
        }
      }
    }

    if (ans.length < 2) {
      out.push('-1');
    } else {
      out.push(ans.length.toString());
      out.push(ans.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
