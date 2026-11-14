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
    const deg = new Int32Array(n + 1);
    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(2 * n);
    const nxt = new Int32Array(2 * n);
    let edgeCnt = 0;

    for (let i = 0; i < n - 1; i++) {
      const u = nextInt(), v = nextInt();
      deg[u]++; deg[v]++;
      to[edgeCnt] = v; nxt[edgeCnt] = head[u]; head[u] = edgeCnt++;
      to[edgeCnt] = u; nxt[edgeCnt] = head[v]; head[v] = edgeCnt++;
    }

    let L = 0;
    const leafCount = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      if (deg[i] === 1) {
        L++;
        const p = to[head[i]];
        leafCount[p]++;
      }
    }

    let b1 = BigInt(L) * BigInt(n - 2);
    for (let i = 1; i <= n; i++) {
      const c = BigInt(leafCount[i]);
      if (c >= 2n) b1 -= (c * (c - 1n)) / 2n;
    }

    let b2_new = 0n;
    for (let i = 1; i <= n; i++) {
      if (deg[i] === 2 && leafCount[i] === 0) b2_new++;
    }

    const invalid = b1 + b2_new;
    const nBig = BigInt(n);
    const total = (nBig * (nBig - 1n) * (nBig - 2n)) / 6n;
    out.push((total - invalid).toString());
  }
  console.log(out.join('\n'));
}

solve();
