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
  const w = readLine().trim();
  let a = 0;
  let d = 0;
  for (let i = 0; i < n; i++) {
    if (w[i] === 'A') a++;
    else d++;
  }
  if (a > d) print('Anton');
  else if (d > a) print('Danik');
  else print('Friendship');
}


solve();
printAll();
