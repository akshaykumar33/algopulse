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
    const [n, m, k] = readIntArray();
    const a = readIntArray();
    let full = 0;
    const rem = [];
    for (let i = 0; i < n; i++) {
      full += Math.floor(a[i] / k);
      const r = a[i] % k;
      if (r > 0) rem.push(r);
    }
    let b = m + 1;
    let ans = 0;
    const take = Math.min(full, Math.floor(b / (k + 1)));
    ans += take * k;
    b -= take * (k + 1);
    if (take < full) {
      if (b > 1) ans += b - 1;
    } else {
      rem.sort((x, y) => y - x);
      for (const r of rem) {
        if (b <= 1) break;
        if (r + 1 <= b) {
          ans += r;
          b -= r + 1;
        } else {
          ans += b - 1;
          b = 0;
        }
      }
    }
    print(ans);
  }
}

solve();
printAll();
