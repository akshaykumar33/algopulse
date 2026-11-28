const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  const cnt = new Int32Array(26);
  for (let t = 0; t < T; t++) {
    const s = readLine().trim();
    cnt.fill(0);
    for (let i = 0; i < s.length; i++) cnt[s.charCodeAt(i) - 97]++;
    let pairs = 0, odd = 0;
    for (let c = 0; c < 26; c++) {
      pairs += cnt[c] >> 1;
      odd += cnt[c] & 1;
    }
    print(pairs >= odd ? 'YES' : 'NO');
  }
}

solve();
printAll();
