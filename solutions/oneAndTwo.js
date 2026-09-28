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
    const n = readInt();
    const a = readIntArray();
    let totalTwos = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] === 2) totalTwos++;
    }

    if (totalTwos % 2 !== 0) {
      print(-1);
      continue;
    }

    if (totalTwos === 0) {
      print(1);
      continue;
    }

    const targetTwos = totalTwos / 2;
    let currentTwos = 0;
    let ans = -1;
    for (let i = 0; i < n; i++) {
      if (a[i] === 2) currentTwos++;
      if (currentTwos === targetTwos) {
        ans = i + 1;
        break;
      }
    }
    print(ans);
  }
}

solve();
printAll();
