const fs = require('fs');
function mulMod(a, b, m) {
  return (a * b) % m;
}
function power(base, exp, mod) {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = mulMod(res, base, mod);
    base = mulMod(base, base, mod);
    exp /= 2n;
  }
  return res;
}
function millerRabin(n, k = 5) {
  if (n <= 1n || n === 4n) return false;
  if (n <= 3n) return true;
  let d = n - 1n;
  while (d % 2n === 0n) d /= 2n;
  const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (let i = 0; i < bases.length; i++) {
    const a = bases[i];
    if (n <= a) break;
    let x = power(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    let tempD = d;
    while (tempD !== n - 1n) {
      x = mulMod(x, x, n);
      tempD *= 2n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = BigInt(input[ptr++]);
    let cur = n;
    while (cur >= 2n) {
      if (millerRabin(cur)) {
        out.push(cur.toString());
        break;
      }
      cur--;
    }
  }
  console.log(out.join('\n'));
}
solve();