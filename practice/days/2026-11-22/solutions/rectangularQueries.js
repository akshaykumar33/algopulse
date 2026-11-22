function countDistinctInSubmatrix(N, A, Q, queries) {
  const pref = Array.from({ length: 11 }, () => Array.from({ length: N + 1 }, () => new Int32Array(N + 1)));
  for (let r = 1; r <= N; r++) {
    for (let c = 1; c <= N; c++) {
      const v = A[r - 1][c - 1];
      for (let k = 1; k <= 10; k++) {
        pref[k][r][c] = pref[k][r - 1][c] + pref[k][r][c - 1] - pref[k][r - 1][c - 1] + (v === k ? 1 : 0);
      }
    }
  }
  const res = new Int32Array(Q);
  for (let i = 0; i < Q; i++) {
    const q = queries[i];
    const x1 = q[0], y1 = q[1], x2 = q[2], y2 = q[3];
    let count = 0;
    for (let k = 1; k <= 10; k++) {
      const cnt = pref[k][x2][y2] - pref[k][x1 - 1][y2] - pref[k][x2][y1 - 1] + pref[k][x1 - 1][y1 - 1];
      if (cnt > 0) count++;
    }
    res[i] = count;
  }
  return res;
}

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
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
  if (n !== null) {
    const a = Array.from({ length: n }, () => new Int32Array(n));
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        a[r][c] = nextInt();
      }
    }
    const q = nextInt();
    const queries = [];
    for (let i = 0; i < q; i++) {
      queries.push([nextInt(), nextInt(), nextInt(), nextInt()]);
    }
    const ans = countDistinctInSubmatrix(n, a, q, queries);
    console.log(Array.from(ans).join('\n'));
  }
}
