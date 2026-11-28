const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const gcd = (a, b) => {
  while (b) [a, b] = [b, a % b];
  return a;
};

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [a, b, c, d, k] = readLine().trim().split(/\s+/).map(BigInt);
    const g1 = gcd(a, b), g2 = gcd(c, d);
    const l = g1 / gcd(g1, g2) * g2;
    print(String(k / l * 2n + 1n));
  }
}

solve();
printAll();
