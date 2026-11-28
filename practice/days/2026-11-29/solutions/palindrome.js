const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const MOD = 1000000007n;

function pw(b, e) {
  let r = 1n;
  b %= MOD;
  while (e > 0n) {
    if (e & 1n) r = r * b % MOD;
    b = b * b % MOD;
    e >>= 1n;
  }
  return r;
}

function solve() {
  const T = readInt();
  const inv = pw(25n, MOD - 2n);
  for (let t = 0; t < T; t++) {
    const n = BigInt(readInt());
    const h = n / 2n;
    let ans = 2n * 26n * (pw(26n, h) - 1n + MOD) % MOD * inv % MOD;
    if (n % 2n === 1n) ans = (ans + pw(26n, h + 1n)) % MOD;
    print(ans.toString());
  }
}

solve();
printAll();
