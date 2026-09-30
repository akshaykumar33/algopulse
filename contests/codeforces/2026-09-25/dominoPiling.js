const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;


const readLine = () => input[inputIndex++];
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);


const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));


function solve() {
  const [m, n] = readIntArray();
  print(Math.floor((m * n) / 2));
}


solve();
printAll();
