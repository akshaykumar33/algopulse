const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      pos++;
    }
    return input.slice(start, pos);
  }

  const tokT = nextToken();
  if (!tokT) return;
  const t = parseInt(tokT, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const k = parseInt(nextToken(), 10);

    const cost = new Array(n + 1);
    for (let i = 1; i <= n; i++) {
      cost[i] = BigInt(nextToken());
    }

    for (let i = 0; i < k; i++) {
      const freeIdx = parseInt(nextToken(), 10);
      cost[freeIdx] = 0n;
    }

    const adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 1; i <= n; i++) {
      const m = parseInt(nextToken(), 10);
      for (let j = 0; j < m; j++) {
        adj[i].push(parseInt(nextToken(), 10));
      }
    }

    const visited = new Uint8Array(n + 1);

    function dfs(u) {
      if (visited[u]) return cost[u];
      visited[u] = 1;
      if (cost[u] === 0n || adj[u].length === 0) {
        return cost[u];
      }

      let sumIngredients = 0n;
      for (let i = 0; i < adj[u].length; i++) {
        sumIngredients += dfs(adj[u][i]);
      }

      if (sumIngredients < cost[u]) {
        cost[u] = sumIngredients;
      }
      return cost[u];
    }

    const res = [];
    for (let i = 1; i <= n; i++) {
      res.push(dfs(i).toString());
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
