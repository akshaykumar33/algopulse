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
  const a = readIntArray();
  const b = readIntArray();
  const m = readInt();
  const mul = (x, y) => {
    const xh = Math.floor(x / 65536), xl = x % 65536;
    return ((xh * y % m) * 65536 + xl * y) % m;
  };
  const pts = [];
  for (let i = 0; i < n; i++) { pts.push([a[i], i]); pts.push([b[i], i]); }
  pts.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  let ans = 1 % m;
  for (let i = 0; i < pts.length;) {
    let j = i, dup = 0;
    while (j < pts.length && pts[j][0] === pts[i][0]) {
      if (j > i && pts[j][1] === pts[j - 1][1]) dup++;
      j++;
    }
    for (let x = 1; x <= j - i; x++) {
      let v = x;
      while (dup > 0 && v % 2 === 0) { v /= 2; dup--; }
      ans = mul(ans, v);
    }
    i = j;
  }
  print(ans);
}

solve();
printAll();
