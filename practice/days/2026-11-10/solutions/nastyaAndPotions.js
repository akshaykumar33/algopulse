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

    const cost = new Float64Array(n + 1);
    for (let i = 1; i <= n; i++) {
      cost[i] = Number(nextToken());
    }

    for (let i = 0; i < k; i++) {
      const freeIdx = parseInt(nextToken(), 10);
      cost[freeIdx] = 0;
    }

    const inDeg = new Int32Array(n + 1);
    const hasRecipe = new Uint8Array(n + 1);
    const recipeSum = new Float64Array(n + 1);
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 1; i <= n; i++) {
      const m = parseInt(nextToken(), 10);
      inDeg[i] = m;
      if (m > 0) hasRecipe[i] = 1;
      for (let j = 0; j < m; j++) {
        const ing = parseInt(nextToken(), 10);
        graph[ing].push(i);
      }
    }

    const queue = [];
    for (let i = 1; i <= n; i++) {
      if (inDeg[i] === 0) {
        queue.push(i);
      }
    }

    let head = 0;
    while (head < queue.length) {
      const u = queue[head++];
      if (hasRecipe[u] && cost[u] > 0 && recipeSum[u] < cost[u]) {
        cost[u] = recipeSum[u];
      }
      const edges = graph[u];
      for (let i = 0; i < edges.length; i++) {
        const v = edges[i];
        recipeSum[v] += cost[u];
        inDeg[v]--;
        if (inDeg[v] === 0) {
          queue.push(v);
        }
      }
    }

    const res = [];
    for (let i = 1; i <= n; i++) {
      res.push(cost[i]);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
