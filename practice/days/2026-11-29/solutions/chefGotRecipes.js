const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  const bit = new Int32Array(128);
  bit[97] = 1;
  bit[101] = 2;
  bit[105] = 4;
  bit[111] = 8;
  bit[117] = 16;
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const cnt = new Array(32).fill(0);
    for (let i = 0; i < n; i++) {
      const s = readLine();
      let m = 0;
      for (let j = 0; j < s.length && m !== 31; j++) m |= bit[s.charCodeAt(j)];
      cnt[m]++;
    }
    let ans = 0;
    for (let x = 0; x < 32; x++) {
      if (!cnt[x]) continue;
      for (let y = x; y < 32; y++) {
        if (!cnt[y] || (x | y) !== 31) continue;
        ans += x === y ? cnt[x] * (cnt[x] - 1) / 2 : cnt[x] * cnt[y];
      }
    }
    print(ans);
  }
}

solve();
printAll();
