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
    const [B, LS] = readIntArray();
    const minSide = Math.sqrt(LS * LS - B * B);
    const maxSide = Math.sqrt(LS * LS + B * B);
    print(`${minSide.toFixed(5)} ${maxSide.toFixed(5)}`);
  }
}

solve();
printAll();
