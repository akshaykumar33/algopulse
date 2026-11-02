const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let start = pos;
    while (pos < buf.length && buf.charCodeAt(pos) > 32) pos++;
    return parseInt(buf.slice(start, pos), 10);
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a1 = nextInt();
    const a2 = nextInt();
    const a3 = nextInt();
    const b1 = nextInt();
    const b2 = nextInt();
    const b3 = nextInt();

    const sumA = a1 + a2 + a3;
    const sumB = b1 + b2 + b3;

    if (sumA === sumB) {
      out.push('Pass');
    } else {
      out.push('Fail');
    }
  }

  console.log(out.join('\n'));
}

solve();

