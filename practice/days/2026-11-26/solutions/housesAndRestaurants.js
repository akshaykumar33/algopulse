const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
  let pos = 0;
  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  let t = parseInt(tStr, 10);
  const out = [];

  while (t--) {
    const n = parseInt(nextToken(), 10);
    const m = parseInt(nextToken(), 10);
    const types = nextToken();

    const parent = new Int32Array(n + 1);
    for (let i = 0; i <= n; i++) parent[i] = i;

    function find(i) {
      let root = i;
      while (root !== parent[root]) root = parent[root];
      let curr = i;
      while (curr !== root) {
        let nxt = parent[curr];
        parent[curr] = root;
        curr = nxt;
      }
      return root;
    }

    function union(i, j) {
      let rootI = find(i);
      let rootJ = find(j);
      if (rootI !== rootJ) {
        parent[rootI] = rootJ;
        return true;
      }
      return false;
    }

    for (let i = 1; i <= n; i++) {
      if (types[i - 1] === 'R') {
        union(0, i);
      }
    }

    let totalCost = 0n;
    const posEdges = [];

    for (let i = 0; i < m; i++) {
      const u = parseInt(nextToken(), 10);
      const v = parseInt(nextToken(), 10);
      const w = BigInt(nextToken());
      if (w < 0n) {
        totalCost += w;
        union(u, v);
      } else {
        posEdges.push([w, u, v]);
      }
    }

    posEdges.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));

    for (let i = 0; i < posEdges.length; i++) {
      const [w, u, v] = posEdges[i];
      if (find(u) !== find(v)) {
        union(u, v);
        totalCost += w;
      }
    }

    out.push(totalCost.toString());
  }

  console.log(out.join('\n'));
}

solve();
