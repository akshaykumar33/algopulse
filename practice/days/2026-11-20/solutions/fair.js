const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const m = nextInt();
  const k = nextInt();
  const s = nextInt();

  const goodsList = Array.from({ length: k + 1 }, () => []);
  for (let i = 1; i <= n; i++) {
    const g = nextInt();
    goodsList[g].push(i);
  }

  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * m);
  const next = new Int32Array(2 * m);
  let ec = 0;

  for (let i = 0; i < m; i++) {
    const u = nextInt();
    const v = nextInt();
    to[ec] = v;
    next[ec] = head[u];
    head[u] = ec++;
    to[ec] = u;
    next[ec] = head[v];
    head[v] = ec++;
  }

  const dist = Array.from({ length: k + 1 }, () => new Int32Array(n + 1).fill(-1));
  const q = new Int32Array(n + 2);

  for (let g = 1; g <= k; g++) {
    const dG = dist[g];
    let qh = 0;
    let qt = 0;
    const starts = goodsList[g];
    for (let i = 0; i < starts.length; i++) {
      const u = starts[i];
      dG[u] = 0;
      q[qt++] = u;
    }

    while (qh < qt) {
      const u = q[qh++];
      const d = dG[u] + 1;
      for (let e = head[u]; e !== -1; e = next[e]) {
        const v = to[e];
        if (dG[v] === -1) {
          dG[v] = d;
          q[qt++] = v;
        }
      }
    }
  }

  const arr = new Int32Array(k);
  const out = [];

  for (let i = 1; i <= n; i++) {
    for (let g = 1; g <= k; g++) {
      arr[g - 1] = dist[g][i];
    }
    arr.sort();
    let sum = 0;
    for (let j = 0; j < s; j++) {
      sum += arr[j];
    }
    out.push(sum);
  }

  console.log(out.join(' '));
}

solve();
