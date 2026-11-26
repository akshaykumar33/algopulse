const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, a, b, c] = readIntArray();
    let best = Infinity;
    for (let z = 1; z <= 50; z++) {
      for (let x = 1; x <= 50; x++) {
        for (let y = 1; y <= 50; y++) {
          const ok = (x <= y && y + (z - 1) * x >= n) || y >= n;
          if (!ok) continue;
          const cost = a * x + b * y + c * z;
          if (cost < best) best = cost;
        }
      }
    }
    print(best);
  }
}

solve();
printAll();
