const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8');
let pos = 0;

const readInt = () => {
  while (data.charCodeAt(pos) < 48) pos++;
  let x = 0;
  while (pos < data.length && data.charCodeAt(pos) >= 48) x = x * 10 + data.charCodeAt(pos++) - 48;
  return x;
};

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt(), k = readInt();
    const d = Math.ceil(n / k);
    const x = n % k === 0 ? k : n - k * (d - 1);
    print(d + ' ' + x);
  }
}

solve();
printAll();
