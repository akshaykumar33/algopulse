const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);
const readStringArray = () => readLine().trim().split(/\s+/);
const readStringIndividualArray = () => readLine().trim().split('');
const readBigInt = () => BigInt(readLine().trim());
const readBigIntArray = () => readLine().trim().split(/\s+/).map(BigInt);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    let n = readInt();
    const ans = [];
    let place = 1;

    while (n > 0) {
      const digit = n % 10;
      if (digit !== 0) {
        ans.push(digit * place);
      }
      n = Math.floor(n / 10);
      place *= 10;
    }

    print(ans.length);
    print(ans.join(' '));
  }
}

solve();
printAll();
