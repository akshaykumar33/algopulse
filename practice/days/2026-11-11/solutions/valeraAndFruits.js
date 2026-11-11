const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const v = parseInt(tokens[ptr++], 10);

  const days = new Int32Array(n);
  const fruits = new Int32Array(n);
  let maxDay = 0;

  for (let i = 0; i < n; i++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    days[i] = a;
    fruits[i] = b;
    if (a > maxDay) maxDay = a;
  }

  const ripe = new Int32Array(maxDay + 2);
  for (let i = 0; i < n; i++) {
    ripe[days[i]] += fruits[i];
  }

  let ans = 0;
  let carry = 0;
  for (let d = 1; d <= maxDay + 1; d++) {
    let cap = v;
    const takeOld = carry < cap ? carry : cap;
    ans += takeOld;
    cap -= takeOld;
    const cur = ripe[d];
    const takeNew = cur < cap ? cur : cap;
    ans += takeNew;
    carry = cur - takeNew;
  }

  console.log(ans);
}

solve();
