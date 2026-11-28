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
    const [n, m] = readIntArray();
    const a = new Uint8Array(n * m);
    for (let i = 0; i < n; i++) {
      const row = readIntArray();
      for (let j = 0; j < m; j++) a[i * m + j] = row[j];
    }
    const fw = new Uint8Array(n * m), bw = new Uint8Array(n * m);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const id = i * m + j;
        if (!a[id]) continue;
        if (i === 0 && j === 0) fw[id] = 1;
        else if ((i > 0 && fw[id - m]) || (j > 0 && fw[id - 1])) fw[id] = 1;
      }
    }
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        const id = i * m + j;
        if (!a[id]) continue;
        if (i === n - 1 && j === m - 1) bw[id] = 1;
        else if ((i < n - 1 && bw[id + m]) || (j < m - 1 && bw[id + 1])) bw[id] = 1;
      }
    }
    if (!fw[n * m - 1]) {
      print(-1);
      continue;
    }
    const cnt = new Int32Array(n + m - 1), cell = new Int32Array(n + m - 1);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const id = i * m + j;
        if (fw[id] && bw[id]) {
          cnt[i + j]++;
          cell[i + j] = id;
        }
      }
    }
    let multi = false;
    for (let d = 0; d < n + m - 1; d++) if (cnt[d] > 1) multi = true;
    if (!multi) {
      print(-1);
      continue;
    }
    const V = n + m;
    const adj = Array.from({ length: V }, () => []);
    for (let d = 0; d < n + m - 1; d++) {
      if (cnt[d] !== 1) continue;
      const id = cell[d];
      if (a[id] !== 1) continue;
      const i = Math.floor(id / m), j = id % m;
      adj[i].push(n + j);
      adj[n + j].push(i);
    }
    const par = new Int32Array(V).fill(-1), vis = new Uint8Array(V), mt = new Uint8Array(V);
    let ans = 0;
    for (let s = 0; s < V; s++) {
      if (vis[s]) continue;
      const order = [s];
      vis[s] = 1;
      for (let k = 0; k < order.length; k++) {
        const u = order[k];
        for (const v of adj[u]) {
          if (vis[v]) continue;
          vis[v] = 1;
          par[v] = u;
          order.push(v);
        }
      }
      for (let k = order.length - 1; k > 0; k--) {
        const u = order[k], p = par[u];
        if (!mt[u] && !mt[p]) {
          mt[u] = mt[p] = 1;
          ans++;
        }
      }
    }
    print(ans);
  }
}

solve();
printAll();
