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
  let n = readInt();

  const mpp = new Map();
  mpp.set(0, 0);

  let i = 1;
  while (true) {
    const valCurrent = mpp.get(i - 1) + i;
    n -= valCurrent;
    if (n < 0) break;

    mpp.set(i, valCurrent);
    i++;
  }

  print(i - 1);
}

solve();
printAll();
