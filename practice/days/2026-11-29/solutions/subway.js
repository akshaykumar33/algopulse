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
  const n = readInt();
  const adj = Array.from({ length: n + 1 }, () => []);
  const deg = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    const [u, v] = readIntArray();
    adj[u].push(v);
    adj[v].push(u);
    deg[u]++;
    deg[v]++;
  }
  const q = [];
  const rem = new Uint8Array(n + 1);
  for (let i = 1; i <= n; i++) if (deg[i] === 1) q.push(i);
  for (let h = 0; h < q.length; h++) {
    const u = q[h];
    rem[u] = 1;
    for (const v of adj[u]) if (!rem[v] && --deg[v] === 1) q.push(v);
  }
  const dist = new Int32Array(n + 1).fill(-1);
  const bq = [];
  for (let i = 1; i <= n; i++) if (!rem[i]) { dist[i] = 0; bq.push(i); }
  for (let h = 0; h < bq.length; h++) {
    const u = bq[h];
    for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; bq.push(v); }
  }
  const res = [];
  for (let i = 1; i <= n; i++) res.push(dist[i]);
  print(res.join(" "));
}

solve();
printAll();
