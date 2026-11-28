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
    const [n, c] = readIntArray();
    const p = readIntArray();
    const a = readIntArray();
    const vis = new Uint8Array(n);
    let ans = 0;
    for (let i = 0; i < n; i++) {
      if (vis[i]) continue;
      const cyc = [];
      let total = 0;
      for (let j = i; !vis[j]; j = p[j] - 1) {
        vis[j] = 1;
        cyc.push(a[j]);
        total += a[j];
      }
      const len = cyc.length;
      if (len === 1) {
        ans += total;
        continue;
      }
      cyc.sort((x, y) => y - x);
      let best = Math.max(0, total - (len - 1) * c), cur = 0;
      for (let j = 0; j < len - 2; j++) {
        cur += cyc[j] - c;
        if (cur > best) best = cur;
      }
      ans += best;
    }
    print(ans);
  }
}

solve();
printAll();
