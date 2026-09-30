const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;


const readLine = () => input[inputIndex++];
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);


const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));


function solve() {
  for (let i = 0; i < 5; i++) {
    const row = readIntArray();
    const j = row.indexOf(1);
    if (j !== -1) print(Math.abs(i - 2) + Math.abs(j - 2));
  }
}


solve();
printAll();
