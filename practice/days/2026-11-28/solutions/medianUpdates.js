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
    const s = readLine().trim();
    const st = new Uint8Array(n);
    let any = -1;
    for (let i = 0; i < n; i++) {
      if (s[i] === s[(i + n - 1) % n] || s[i] === s[(i + 1) % n]) {
        st[i] = 1;
        any = i;
      }
    }
    if (any === -1) {
      print(-1);
      continue;
    }
    let mx = 0, len = 0;
    for (let k = 1; k <= n; k++) {
      const i = (any + k) % n;
      if (st[i]) {
        mx = Math.max(mx, Math.ceil(len / 2));
        len = 0;
      } else len++;
    }
    print(mx + 1);
  }
}

solve();
printAll();
