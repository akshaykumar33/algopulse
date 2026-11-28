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
  const req = [];
  for (let i = 0; i < n; i++) {
    const [c, p] = readIntArray();
    req.push([c, p, i + 1]);
  }
  readInt();
  const r = readIntArray().map((v, i) => [v, i + 1]);
  r.sort((a, b) => a[0] - b[0]);
  req.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
  const used = new Array(r.length).fill(false);
  const res = [];
  let sum = 0;
  for (const [c, p, id] of req) {
    for (let j = 0; j < r.length; j++) {
      if (!used[j] && r[j][0] >= c) {
        used[j] = true;
        res.push(id + " " + r[j][1]);
        sum += p;
        break;
      }
    }
  }
  print(res.length + " " + sum);
  for (const x of res) print(x);
}

solve();
printAll();
