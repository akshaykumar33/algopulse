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
  const t = readInt();
  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    const par = new Int32Array(n + 1), px = new Uint8Array(n + 1), deg = new Int32Array(n + 1);
    for (let i = 0; i <= n; i++) par[i] = i;
    const find = (x) => {
      let r = x, p = 0;
      while (par[r] !== r) { p ^= px[r]; r = par[r]; }
      let cur = x, cp = p;
      while (par[cur] !== cur) {
        const nx = par[cur], np = cp ^ px[cur];
        par[cur] = r; px[cur] = cp;
        cur = nx; cp = np;
      }
      return r;
    };
    let ok = true;
    for (let i = 0; i < n; i++) {
      const [u, v] = readIntArray();
      if (!ok) continue;
      if (u === v || ++deg[u] > 2 || ++deg[v] > 2) { ok = false; continue; }
      const ru = find(u), rv = find(v);
      if (ru === rv) {
        if (px[u] === px[v]) ok = false;
      } else {
        px[ru] = px[u] ^ px[v] ^ 1;
        par[ru] = rv;
      }
    }
    print(ok ? "YES" : "NO");
  }
}

solve();
printAll();
