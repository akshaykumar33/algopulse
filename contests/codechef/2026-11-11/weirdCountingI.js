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
    const deg = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) deg[a[i]]++;
    let ans = 1, cnt = 0;
    const col = new Uint8Array(n + 1);
    for (let s = 1; s <= n; s++) {
      if (col[s]) continue;
      let v = s;
      while (!col[v]) {
        col[v] = 1;
        v = a[v - 1];
      }
      if (col[v] === 1 && a[v - 1] !== v) {
        let len = 0, pure = true, u = v;
        do {
          len++;
          if (deg[u] !== 1) pure = false;
          u = a[u - 1];
        } while (u !== v);
        if (pure) {
          let p = 1;
          for (let i = 0; i < len; i++) p = p * 2 % MOD;
          ans = mul(ans, (p - 1 + MOD) % MOD);
          cnt -= len;
        }
      }
      v = s;
      while (col[v] === 1) {
        col[v] = 2;
        v = a[v - 1];
      }
    }
    for (let v = 1; v <= n; v++) {
      if (a[v - 1] !== v && deg[v] > 0) cnt++;
    }
    for (let i = 0; i < cnt; i++) ans = ans * 2 % MOD;
    print(ans);
  }
}

solve();
printAll();
