const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const n = nextInt();
  if (n === null) return;
  const people = [];
  for (let i = 0; i < n; i++) {
    const a = nextInt(), b = nextInt();
    people.push({ a: BigInt(a), b: BigInt(b), diff: a - b });
  }
  people.sort((u, v) => v.diff - u.diff);
  const bigN = BigInt(n);
  let total = 0n;
  for (let i = 0; i < n; i++) {
    const j = BigInt(i + 1);
    total += people[i].a * (j - 1n) + people[i].b * (bigN - j);
  }
  console.log(total.toString());
}

solve();
