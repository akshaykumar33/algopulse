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
 
  let s = readStringIndividualArray();
  let lc = 0;
  let uc = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] >= 'a' && s[i] <= 'z') {
      lc++;
    } else {
      uc++;
    }
  }

  if (lc >= uc) {
    print(s.join('').toLowerCase());
  } else {
    print(s.join('').toUpperCase());
  }
  
}


solve();
printAll();

