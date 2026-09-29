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
 
  let [n,m] = readIntArray();

  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      print('#'.repeat(m))
    } else {
      if (i % 4 === 1) {
        print('.'.repeat(m-1) + '#')
      } else {
        print('#' + '.'.repeat(m-1))
      }
    }
  }
}


solve();
printAll();

