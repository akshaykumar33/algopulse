const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextBigInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let x = 0n;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10n + BigInt(buf[ptr] - 48);
    ptr++;
  }
  return x;
}

function solve() {
  const n = Number(nextBigInt());
  const figs = [];
  for (let i = 0; i < n; i++) {
    const k = nextBigInt();
    const c = nextBigInt();
    figs.push({ k, c });
  }
  figs.sort((a, b) => (a.c < b.c ? -1 : a.c > b.c ? 1 : 0));
  const t = Number(nextBigInt());
  const p = [];
  for (let i = 0; i < t; i++) p.push(nextBigInt());
  let ans = 0n;
  let f = 1n;
  let pi = 0;
  let done = 0n;
  for (let i = 0; i < n; i++) {
    let rem = figs[i].k;
    const cost = figs[i].c;
    while (rem > 0n) {
      if (pi < t) {
        const cap = p[pi] - done;
        if (rem >= cap) {
          ans += cap * cost * f;
          done += cap;
          rem -= cap;
          f += 1n;
          pi++;
        } else {
          ans += rem * cost * f;
          done += rem;
          rem = 0n;
        }
      } else {
        ans += rem * cost * f;
        done += rem;
        rem = 0n;
      }
    }
  }
  console.log(ans.toString());
}

solve();
