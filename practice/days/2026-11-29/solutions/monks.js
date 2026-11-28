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
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = Float64Array.from(readIntArray()).sort();
    let rest = 0;
    for (let i = 0; i < n; i++) rest += a[i];
    let gone = 0, ans = n - 1;
    for (let k = 0; k < n; k++) {
      const cnt = n - k;
      const mx = a[cnt - 1];
      if (mx * cnt - rest <= gone) {
        ans = k;
        break;
      }
      rest -= mx;
      gone += mx;
    }
    print(ans);
  }
}

solve();
printAll();
