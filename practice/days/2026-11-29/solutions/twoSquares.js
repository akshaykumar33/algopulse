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
  const a = readIntArray();
  const b = readIntArray();
  const xs = [a[0], a[2], a[4], a[6]], ys = [a[1], a[3], a[5], a[7]];
  const x1 = Math.min(...xs), x2 = Math.max(...xs), y1 = Math.min(...ys), y2 = Math.max(...ys);
  const cx = (b[0] + b[2] + b[4] + b[6]) / 4, cy = (b[1] + b[3] + b[5] + b[7]) / 4;
  const d = Math.abs(b[0] - cx) + Math.abs(b[1] - cy);
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      if (Math.abs(x - cx) + Math.abs(y - cy) <= d) { print("YES"); return; }
    }
  }
  print("NO");
}

solve();
printAll();
