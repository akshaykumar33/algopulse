const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const s = readLine().trim();
  const t = readLine().trim();
  if (s.length !== t.length) {
    print('NO');
    return;
  }
  const rev = s.split('').reverse().join('');
  print(rev === t ? 'YES' : 'NO');
}

solve();
printAll();
