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
  const [x, y, z] = readIntArray();
  const [x1, y1, z1] = readIntArray();
  const a = readIntArray();
  let ans = 0;
  if (y < 0) ans += a[0];
  if (y > y1) ans += a[1];
  if (z < 0) ans += a[2];
  if (z > z1) ans += a[3];
  if (x < 0) ans += a[4];
  if (x > x1) ans += a[5];
  print(ans);
}

solve();
printAll();
