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
const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));

function solve() {
  const t = readInt();
  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(readLine().trim());
    let ans = n, l = 1n;
    for (let x = 1n; l <= n; x++) {
      l = l / gcd(l, x) * x;
      ans += n / l;
    }
    print((ans % MOD).toString());
  }
}

solve();
printAll();
