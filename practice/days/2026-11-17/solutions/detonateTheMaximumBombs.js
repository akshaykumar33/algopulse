var maximumDetonation = function(bombs) {
  const n = bombs.length;
  const adj = Array.from({ length: n }, () => []);

  for (let i = 0; i < n; i++) {
    const x1 = bombs[i][0];
    const y1 = bombs[i][1];
    const r1 = BigInt(bombs[i][2]);
    const r1Sq = r1 * r1;

    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const dx = BigInt(x1 - bombs[j][0]);
      const dy = BigInt(y1 - bombs[j][1]);
      if (dx * dx + dy * dy <= r1Sq) {
        adj[i].push(j);
      }
    }
  }

  let maxCount = 0;
  const q = new Int32Array(n);

  for (let i = 0; i < n; i++) {
    const vis = new Uint8Array(n);
    vis[i] = 1;
    let head = 0;
    let tail = 0;
    q[tail++] = i;
    let cnt = 1;

    while (head < tail) {
      const u = q[head++];
      for (let j = 0; j < adj[u].length; j++) {
        const v = adj[u][j];
        if (!vis[v]) {
          vis[v] = 1;
          cnt++;
          q[tail++] = v;
        }
      }
    }

    if (cnt > maxCount) {
      maxCount = cnt;
    }
  }

  return maxCount;
};

var solve = maximumDetonation;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0]) && Array.isArray(parsed[0][0])) {
        console.log(JSON.stringify(solve(parsed[0])));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
