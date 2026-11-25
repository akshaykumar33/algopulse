const fs = require('fs');
const buf = fs.readFileSync(0);
let pos = 0;
const len = buf.length;

function nextBigInt() {
  while (pos < len && buf[pos] <= 32) pos++;
  if (pos >= len) return 0n;
  let res = 0n;
  while (pos < len && buf[pos] > 32) {
    res = res * 10n + BigInt(buf[pos] - 48);
    pos++;
  }
  return res;
}

const MOD = 1000000007n;

function modPow(base, exp) {
  let res = 1n;
  base %= MOD;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % MOD;
    base = (base * base) % MOD;
    exp >>= 1n;
  }
  return res;
}

function solve() {
  const t = Number(nextBigInt());
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextBigInt();
    const k = nextBigInt();
    const kMod = k % MOD;
    if (kMod === 1n) {
      out.push((n % MOD).toString());
    } else {
      const kn = modPow(kMod, n);
      const num = (kMod * ((kn - 1n + MOD) % MOD)) % MOD;
      const inv = modPow((kMod - 1n + MOD) % MOD, MOD - 2n);
      out.push(((num * inv) % MOD).toString());
    }
  }
  console.log(out.join('\n'));
}

solve();
