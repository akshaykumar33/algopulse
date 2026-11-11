const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const MOD = 998244353;
const mul = (a, b) => ((a * (b >>> 16)) % MOD * 65536 + a * (b & 65535)) % MOD;

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = readIntArray();
    const col = new Uint8Array(n + 1);
    const len = new Int32Array(n + 1);
    const dep = new Int32Array(n + 1).fill(-1);
    let ans = 1;
    for (let s = 1; s <= n; s++) {
      if (col[s]) continue;
      let v = s;
      while (!col[v]) {
        col[v] = 1;
        v = a[v - 1];
      }
      if (col[v] === 1) {
        let l = 0, u = v;
        do {
          l++;
          u = a[u - 1];
        } while (u !== v);
        do {
          len[u] = l;
          dep[u] = 0;
          u = a[u - 1];
        } while (u !== v);
        for (let i = 0; i < l - 1; i++) ans = mul(ans, l + 1);
      }
      v = s;
      while (col[v] === 1) {
        col[v] = 2;
        v = a[v - 1];
      }
    }
    const stk = [];
    for (let s = 1; s <= n; s++) {
      let v = s;
      while (dep[v] < 0) {
        stk.push(v);
        v = a[v - 1];
      }
      while (stk.length) {
        const u = stk.pop();
        dep[u] = dep[v] + 1;
        len[u] = len[v];
        ans = mul(ans, dep[u] - 1 + len[u]);
        v = u;
      }
    }
    print(ans);
  }
}

solve();
printAll();
