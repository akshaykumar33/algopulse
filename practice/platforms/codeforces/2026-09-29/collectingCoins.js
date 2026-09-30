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
    const [a, b, c, n] = readIntArray();
    const sum = a + b + c + n;
    const maxVal = Math.max(a, b, c);
    if (sum % 3 === 0 && Math.floor(sum / 3) >= maxVal) {
      print('YES');
    } else {
      print('NO');
    }
  }
}

solve();
printAll();
