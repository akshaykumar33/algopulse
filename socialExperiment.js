const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt(); 
  for (let t = 0; t < T; t++) {
    let n = readInt(); 
    
    if (n === 2) {
      print(2);
    } else if (n === 3) {
      print(3);
    } else if (n % 2 === 0) {
      print(0);
    } else {
      print(1);
    }
  }
}

solve();
printAll();