const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let start = pos;
    while (pos < buf.length && buf.charCodeAt(pos) > 32) pos++;
    return BigInt(buf.slice(start, pos));
  }

  const t = nextBigInt();
  if (t === null) return;
  const out = [];
  for (let i = 0n; i < t; i++) {
    const n = nextBigInt();
    const k = nextBigInt();
    if (n === null || k === null) break;
    if (k === 0n) {
      out.push(`0 ${n.toString()}`);
    } else {
      const student = n / k;
      const teacher = n % k;
      out.push(`${student.toString()} ${teacher.toString()}`);
    }
  }
  console.log(out.join('\n'));
}

solve();
