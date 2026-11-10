const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < n - 1; i++) {
    const u = nextInt();
    const v = nextInt();
    const c = nextInt();
    adj[u].push([v, c]);
    adj[v].push([u, c]);
  }

  let ans = 0;
  function dfs(u, p, cur) {
    if (cur > ans) ans = cur;
    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i][0];
      const c = adj[u][i][1];
      if (v !== p) {
        dfs(v, u, cur + c);
      }
    }
  }

  dfs(0, -1, 0);
  console.log(ans);
}

solve();

