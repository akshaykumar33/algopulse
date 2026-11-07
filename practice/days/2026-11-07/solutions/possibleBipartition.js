var possibleBipartition = function(n, dislikes) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < dislikes.length; i++) {
    const u = dislikes[i][0];
    const v = dislikes[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }
  const col = new Int8Array(n + 1);
  for (let i = 1; i <= n; i++) {
    if (col[i] !== 0) continue;
    col[i] = 1;
    const q = [i];
    let head = 0;
    while (head < q.length) {
      const u = q[head++];
      const c = col[u];
      const nc = 3 - c;
      const neighbors = adj[u];
      for (let j = 0; j < neighbors.length; j++) {
        const v = neighbors[j];
        if (col[v] === 0) {
          col[v] = nc;
          q.push(v);
        } else if (col[v] !== nc) {
          return false;
        }
      }
    }
  }
  return true;
};

var solve = possibleBipartition;
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
    console.error(err);
  }
}
module.exports = solve;
