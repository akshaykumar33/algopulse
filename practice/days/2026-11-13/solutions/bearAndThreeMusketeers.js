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

  const n = nextInt();
  if (n === null) return;
  const m = nextInt();

  const deg = new Int32Array(n + 1);
  const edgesU = new Int32Array(m);
  const edgesV = new Int32Array(m);
  const adj = Array.from({ length: n + 1 }, () => []);
  const hasEdge = new Uint8Array((n + 1) * (n + 1));

  for (let i = 0; i < m; i++) {
    const u = nextInt();
    const v = nextInt();
    edgesU[i] = u;
    edgesV[i] = v;
    deg[u]++;
    deg[v]++;
    adj[u].push(v);
    adj[v].push(u);
    hasEdge[u * (n + 1) + v] = 1;
    hasEdge[v * (n + 1) + u] = 1;
  }

  let minRecog = 1000000000;

  for (let i = 0; i < m; i++) {
    let u = edgesU[i];
    let v = edgesV[i];
    if (deg[u] > deg[v]) {
      const temp = u;
      u = v;
      v = temp;
    }

    const list = adj[u];
    const len = list.length;
    const vOffset = v * (n + 1);

    for (let j = 0; j < len; j++) {
      const w = list[j];
      if (w !== v && hasEdge[vOffset + w] === 1) {
        const sum = deg[u] + deg[v] + deg[w] - 6;
        if (sum < minRecog) {
          minRecog = sum;
        }
      }
    }
  }

  if (minRecog === 1000000000) {
    console.log(-1);
  } else {
    console.log(minRecog);
  }
}

solve();
