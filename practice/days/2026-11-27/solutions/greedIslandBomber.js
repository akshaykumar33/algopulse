const fs = require('fs');
const data = fs.readFileSync(0);
let pos = 0;
const readInt = () => {
  while (data[pos] < 48) pos++;
  let x = 0;
  while (pos < data.length && data[pos] >= 48) x = x * 10 + data[pos++] - 48;
  return x;
};
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const m = readInt();
    const head = new Int32Array(n + 1).fill(-1);
    const nxt = new Int32Array(2 * m);
    const to = new Int32Array(2 * m);
    for (let i = 0; i < m; i++) {
      const u = readInt(), v = readInt();
      to[2 * i] = v; nxt[2 * i] = head[u]; head[u] = 2 * i;
      to[2 * i + 1] = u; nxt[2 * i + 1] = head[v]; head[v] = 2 * i + 1;
    }
    const tin = new Int32Array(n + 1).fill(-1);
    const low = new Int32Array(n + 1);
    const pe = new Int32Array(n + 1).fill(-1);
    const it = new Int32Array(n + 1);
    const st = new Int32Array(n + 1);
    let timer = 0, ans = 0;
    for (let s = 1; s <= n; s++) {
      if (tin[s] !== -1) continue;
      let top = 0;
      st[top++] = s;
      tin[s] = low[s] = timer++;
      it[s] = head[s];
      while (top) {
        const u = st[top - 1];
        const e = it[u];
        if (e !== -1) {
          it[u] = nxt[e];
          if ((e ^ 1) === pe[u]) continue;
          const v = to[e];
          if (tin[v] === -1) {
            tin[v] = low[v] = timer++;
            pe[v] = e;
            it[v] = head[v];
            st[top++] = v;
          } else if (tin[v] < low[u]) low[u] = tin[v];
        } else {
          top--;
          if (top) {
            const p = st[top - 1];
            if (low[u] < low[p]) low[p] = low[u];
            if (low[u] > tin[p]) ans++;
          }
        }
      }
    }
    print(ans);
  }
}

solve();
printAll();
