const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const l = new BigInt64Array(n + 1);
    const r = new BigInt64Array(n + 1);
    for (let i = 1; i <= n; i++) {
      l[i] = BigInt(nextInt());
      r[i] = BigInt(nextInt());
    }

    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(2 * n);
    const nxt = new Int32Array(2 * n);
    let edgeCnt = 0;

    function addEdge(u, v) {
      to[edgeCnt] = v;
      nxt[edgeCnt] = head[u];
      head[u] = edgeCnt++;
    }

    for (let i = 0; i < n - 1; i++) {
      const u = nextInt(), v = nextInt();
      addEdge(u, v);
      addEdge(v, u);
    }

    const parent = new Int32Array(n + 1);
    const order = new Int32Array(n);
    let orderLen = 0;
    const stack = [1];
    parent[1] = -1;

    while (stack.length > 0) {
      const u = stack.pop();
      order[orderLen++] = u;
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = to[e];
        if (v !== parent[u]) {
          parent[v] = u;
          stack.push(v);
        }
      }
    }

    const dp0 = new BigInt64Array(n + 1);
    const dp1 = new BigInt64Array(n + 1);

    for (let i = n - 1; i >= 0; i--) {
      const u = order[i];
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = to[e];
        if (v !== parent[u]) {
          const diff00 = l[u] > l[v] ? l[u] - l[v] : l[v] - l[u];
          const diff01 = l[u] > r[v] ? l[u] - r[v] : r[v] - l[u];
          const opt0 = diff00 + dp0[v] > diff01 + dp1[v] ? diff00 + dp0[v] : diff01 + dp1[v];
          dp0[u] += opt0;

          const diff10 = r[u] > l[v] ? r[u] - l[v] : l[v] - r[u];
          const diff11 = r[u] > r[v] ? r[u] - r[v] : r[v] - r[u];
          const opt1 = diff10 + dp0[v] > diff11 + dp1[v] ? diff10 + dp0[v] : diff11 + dp1[v];
          dp1[u] += opt1;
        }
      }
    }

    const ans = dp0[1] > dp1[1] ? dp0[1] : dp1[1];
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
