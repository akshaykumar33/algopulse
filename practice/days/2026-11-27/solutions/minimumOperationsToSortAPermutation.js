var minOperations = function(nums) {
  const n = nums.length;
  if (n === 1) return 0;
  const d = ((nums[1] - nums[0]) % n + n) % n;
  if (d !== 1 && d !== n - 1) return -1;
  for (let i = 1; i < n; i++) if (nums[i] !== (nums[i - 1] + d) % n) return -1;
  const id = (s, f) => s * 2 + f;
  const dist = new Int32Array(2 * n).fill(-1);
  const q = new Int32Array(2 * n);
  let h = 0, tl = 0;
  const st = id(nums[0], d === 1 ? 0 : 1);
  dist[st] = 0;
  q[tl++] = st;
  while (h < tl) {
    const u = q[h++];
    const s = u >> 1, f = u & 1;
    if (s === 0 && f === 0) return dist[u];
    const dd = f ? n - 1 : 1;
    const a = id((s + dd) % n, f);
    const b = id((s + dd * (n - 1)) % n, f ^ 1);
    if (dist[a] < 0) { dist[a] = dist[u] + 1; q[tl++] = a; }
    if (dist[b] < 0) { dist[b] = dist[u] + 1; q[tl++] = b; }
  }
  return -1;
};
var solve = minOperations;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minOperations;
