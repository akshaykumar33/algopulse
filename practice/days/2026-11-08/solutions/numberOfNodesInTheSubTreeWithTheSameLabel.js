var countSubTrees = function(n, edges, labels) {
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }
  const order = new Int32Array(n);
  const parent = new Int32Array(n).fill(-1);
  const vis = new Uint8Array(n);
  vis[0] = 1;
  let head = 0, tail = 0;
  order[tail++] = 0;
  while (head < tail) {
    const u = order[head++];
    const list = adj[u];
    for (let i = 0; i < list.length; i++) {
      const v = list[i];
      if (!vis[v]) {
        vis[v] = 1;
        parent[v] = u;
        order[tail++] = v;
      }
    }
  }
  const count = new Int32Array(n * 26);
  const ans = new Int32Array(n);
  for (let i = n - 1; i >= 0; i--) {
    const u = order[i];
    const baseU = u * 26;
    const charCode = labels.charCodeAt(u) - 97;
    count[baseU + charCode]++;
    ans[u] = count[baseU + charCode];
    const p = parent[u];
    if (p !== -1) {
      const baseP = p * 26;
      for (let c = 0; c < 26; c++) {
        count[baseP + c] += count[baseU + c];
      }
    }
  }
  return Array.from(ans);
};

var solve = countSubTrees;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
