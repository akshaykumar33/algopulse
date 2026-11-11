var minReorder = function(n, connections) {
  const m = connections.length;
  const head = new Int32Array(n).fill(-1);
  const to = new Int32Array(m * 2);
  const nxt = new Int32Array(m * 2);
  const cost = new Uint8Array(m * 2);
  let ptr = 0;

  const add = (u, v, w) => {
    to[ptr] = v;
    cost[ptr] = w;
    nxt[ptr] = head[u];
    head[u] = ptr++;
  };

  for (let i = 0; i < m; i++) {
    const a = connections[i][0];
    const b = connections[i][1];
    add(a, b, 1);
    add(b, a, 0);
  }

  const vis = new Uint8Array(n);
  const q = new Int32Array(n);
  let qHead = 0;
  let qTail = 0;
  q[qTail++] = 0;
  vis[0] = 1;
  let ans = 0;

  while (qHead < qTail) {
    const u = q[qHead++];
    for (let e = head[u]; e !== -1; e = nxt[e]) {
      const v = to[e];
      if (!vis[v]) {
        vis[v] = 1;
        ans += cost[e];
        q[qTail++] = v;
      }
    }
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 2 && typeof p[0] === 'number';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(minReorder(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(minReorder(...args)));
      }
    }
  }
}

module.exports = minReorder;
