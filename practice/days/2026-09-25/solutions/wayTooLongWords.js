const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);


const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const n = readInt();
  for (let i = 0; i < n; i++) {
    const word = readLine().trim();
    print(word.length > 10 ? word[0] + (word.length - 2) + word[word.length - 1] : word);
  }
}


solve();
printAll();
