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
    const [n, x] = readIntArray();
    const a = readIntArray();
    let maxDist = a[0];
    for (let i = 1; i < n; i++) {
      const dist = a[i] - a[i - 1];
      if (dist > maxDist) maxDist = dist;
    }
    const lastDist = 2 * (x - a[n - 1]);
    if (lastDist > maxDist) maxDist = lastDist;
    print(maxDist);
  }
}

solve();
printAll();
