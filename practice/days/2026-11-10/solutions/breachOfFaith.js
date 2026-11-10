const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      pos++;
    }
    return input.slice(start, pos);
  }

  const tokT = nextToken();
  if (!tokT) return;
  const t = parseInt(tokT, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const b = [];
    for (let i = 0; i < 2 * n; i++) {
      b.push(BigInt(nextToken()));
    }

    b.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));

    let s1 = 0n;
    let s0 = 0n;
    for (let i = 0; i < 2 * n - 1; i += 2) {
      s1 += b[i];
      s0 += b[i + 1];
    }
    s1 += b[2 * n - 1];
    s0 -= b[2 * n - 1];

    const x = s1 - s0;

    const a = [];
    for (let i = 0; i < 2 * n - 1; i++) {
      a.push(b[i]);
    }
    a.push(x);
    a.push(b[2 * n - 1]);

    out.push(a.map(v => v.toString()).join(' '));
  }

  console.log(out.join('\n'));
}

solve();
