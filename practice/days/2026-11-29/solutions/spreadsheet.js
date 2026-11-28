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
  const n = readInt();
  for (let i = 0; i < n; i++) {
    const s = readLine().trim();
    const m = s.match(/^R(\d+)C(\d+)$/);
    if (m) {
      let c = parseInt(m[2], 10), col = "";
      while (c > 0) {
        c--;
        col = String.fromCharCode(65 + (c % 26)) + col;
        c = Math.floor(c / 26);
      }
      print(col + m[1]);
    } else {
      const k = s.match(/^([A-Z]+)(\d+)$/);
      let c = 0;
      for (const ch of k[1]) c = c * 26 + (ch.charCodeAt(0) - 64);
      print("R" + k[2] + "C" + c);
    }
  }
}

solve();
printAll();
