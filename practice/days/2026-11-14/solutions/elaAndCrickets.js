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

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const r1 = nextInt(), c1 = nextInt();
    const r2 = nextInt(), c2 = nextInt();
    const r3 = nextInt(), c3 = nextInt();
    const x = nextInt(), y = nextInt();

    let rc = r1, cc = c1;
    if (r2 === r1) rc = r1;
    else if (r2 === r3) rc = r2;
    else rc = r1;

    if (r1 === r2 || r1 === r3) rc = r1;
    else rc = r2;

    if (c1 === c2 || c1 === c3) cc = c1;
    else cc = c2;

    const isCorner = (rc === 1 || rc === n) && (cc === 1 || cc === n);
    if (isCorner) {
      if (x === rc || y === cc) out.push('YES');
      else out.push('NO');
    } else {
      if ((x % 2 === rc % 2) || (y % 2 === cc % 2)) out.push('YES');
      else out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
