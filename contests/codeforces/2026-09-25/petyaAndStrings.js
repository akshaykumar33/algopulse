const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;


const readLine = () => input[inputIndex++];


const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));


function solve() {
  const a = readLine().trim().toLowerCase();
  const b = readLine().trim().toLowerCase();
  print(a < b ? -1 : a > b ? 1 : 0);
}


solve();
printAll();
