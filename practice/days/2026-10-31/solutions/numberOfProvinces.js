var findCircleNum = function(isConnected) {
  const n = isConnected.length;
  const vis = new Array(n).fill(false);
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (!vis[i]) {
      ans++;
      const q = [i];
      vis[i] = true;
      while (q.length > 0) {
        const u = q.pop();
        for (let v = 0; v < n; v++) {
          if (isConnected[u][v] === 1 && !vis[v]) {
            vis[v] = true;
            q.push(v);
          }
        }
      }
    }
  }
  return ans;
};
var solve = typeof findCircleNum !== 'undefined' ? findCircleNum : null;

// ---------------- LOCAL TEST HARNESS ----------------
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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
