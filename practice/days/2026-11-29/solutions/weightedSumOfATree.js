var weightedSum = function(parent, nums) {
  const n = parent.length;
  const head = new Int32Array(n).fill(-1), nxt = new Int32Array(n);
  for (let i = 1; i < n; i++) { nxt[i] = head[parent[i]]; head[parent[i]] = i; }
  const dep = new Int32Array(n), q = new Int32Array(n);
  dep[0] = 1;
  let h = 0, t = 1, mx = 1;
  while (h < t) {
    const u = q[h++];
    if (dep[u] > mx) mx = dep[u];
    for (let v = head[u]; v !== -1; v = nxt[v]) { dep[v] = dep[u] + 1; q[t++] = v; }
  }
  let ans = 0;
  for (let i = 0; i < n; i++) ans += nums[i] * (mx - dep[i] + 1);
  return ans;
};
var solve = weightedSum;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = weightedSum;
