const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const MOD = 1000000007n;
const MODF = 1000000006n;

function modpow(base, exp, mod) {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = res * base % mod;
    exp >>= 1n;
    base = base * base % mod;
  }
  return res;
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, a] = readIntArray();
    const A = BigInt(a);
    const N = BigInt(n);
    if (A % MOD === 0n) {
      print('0');
      continue;
    }
    let ans = 0n;
    let curExp = 1n;
    let curFact = 1n;
    for (let i = 1n; i <= N; i++) {
      const exp2i1 = (2n * i - 1n);
      const e_i = exp2i1 * curFact % MODF;
      ans = (ans + modpow(A, e_i, MOD)) % MOD;
      curFact = curFact * (2n * i) % MODF;
    }
    print(ans.toString());
  }
}

solve();
printAll();
