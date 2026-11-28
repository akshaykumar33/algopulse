const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const gcd = (a, b) => (b ? gcd(b, a % b) : a);

function sim(a, b, c) {
  let x = 0, y = 0, steps = 0;
  while (x !== c && y !== c) {
    if (x === 0) x = a;
    else if (y === b) y = 0;
    else {
      const d = Math.min(x, b - y);
      x -= d;
      y += d;
    }
    steps++;
  }
  return steps;
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const a = readInt(), b = readInt(), c = readInt();
    if (c > Math.max(a, b) || c % gcd(a, b) !== 0) print(-1);
    else print(Math.min(sim(a, b, c), sim(b, a, c)));
  }
}

solve();
printAll();
