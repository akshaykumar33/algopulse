const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solveCase(n, b) {
  let count = new Map();
  for (let i = 0; i < n; i++) {
    count.set(b[i], (count.get(b[i]) || 0) + 1);
  }

  for (let [f, c] of count.entries()) {
    if (c % f !== 0) return -1;
  }

  let active = new Map();
  let curVal = 0;
  let a = new Int32Array(n);

  for (let i = 0; i < n; i++) {
    let f = b[i];
    let act = active.get(f);
    if (!act || act.rem === 0) {
      curVal++;
      let rem = f - 1;
      a[i] = curVal;
      if (rem > 0) active.set(f, { val: curVal, rem });
      else active.delete(f);
    } else {
      a[i] = act.val;
      act.rem--;
      if (act.rem === 0) active.delete(f);
    }
  }

  return a.join(' ');
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const b = readIntArray();
    print(solveCase(n, b));
  }
}

solve();
printAll();
