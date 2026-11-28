const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const MOD = 1000000007n;

function mul(a, b) {
  const c = [];
  for (let i = 0; i < 4; i++) {
    c.push([0n, 0n, 0n, 0n]);
    for (let k = 0; k < 4; k++) {
      if (a[i][k] === 0n) continue;
      for (let j = 0; j < 4; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
    }
  }
  return c;
}

function solve() {
  const T = readInt();
  const base = [
    [1n, 1n, 1n, 2n],
    [1n, 0n, 0n, 1n],
    [1n, 0n, 0n, 1n],
    [1n, 0n, 0n, 0n],
  ];
  for (let t = 0; t < T; t++) {
    let n = readInt();
    let res = [[1n, 0n, 0n, 0n], [0n, 1n, 0n, 0n], [0n, 0n, 1n, 0n], [0n, 0n, 0n, 1n]];
    let b = base;
    while (n > 0) {
      if (n & 1) res = mul(res, b);
      b = mul(b, b);
      n = Math.floor(n / 2);
    }
    print(res[0][0].toString());
  }
}

solve();
printAll();
