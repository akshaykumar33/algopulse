const fs = require('fs');
class LazySegTree {
  constructor(n) {
    this.n = n;
    this.min = new Int32Array(4 * n);
    this.lazy = new Int32Array(4 * n);
    this.build(1, 0, n - 1);
  }
  build(node, l, r) {
    if (l === r) {
      this.min[node] = l;
      return;
    }
    const mid = (l + r) >> 1;
    this.build(node * 2, l, mid);
    this.build(node * 2 + 1, mid + 1, r);
    this.min[node] = Math.min(this.min[node * 2], this.min[node * 2 + 1]);
  }
  apply(node, val) {
    this.min[node] += val;
    this.lazy[node] += val;
  }
  push(node) {
    if (this.lazy[node] !== 0) {
      this.apply(node * 2, this.lazy[node]);
      this.apply(node * 2 + 1, this.lazy[node]);
      this.lazy[node] = 0;
    }
  }
  update(node, l, r, ql, qr, val) {
    if (ql <= l && r <= qr) {
      this.apply(node, val);
      return;
    }
    this.push(node);
    const mid = (l + r) >> 1;
    if (ql <= mid) this.update(node * 2, l, mid, ql, qr, val);
    if (qr > mid) this.update(node * 2 + 1, mid + 1, r, ql, qr, val);
    this.min[node] = Math.min(this.min[node * 2], this.min[node * 2 + 1]);
  }
  query(node, l, r, ql, qr) {
    if (ql <= l && r <= qr) return this.min[node];
    this.push(node);
    const mid = (l + r) >> 1;
    let res = 1e9;
    if (ql <= mid) res = Math.min(res, this.query(node * 2, l, mid, ql, qr));
    if (qr > mid) res = Math.min(res, this.query(node * 2 + 1, mid + 1, r, ql, qr));
    return res;
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);

    const M = Math.ceil(n / 2);
    const limit = 2 * M - 1;
    const elements = [];
    for (let i = 0; i < limit; i++) elements.push(i);
    elements.sort((i, j) => a[i] - a[j]);

    const tree = new LazySegTree(M);
    const S = new Uint8Array(limit);
    let countS = 0;

    for (let k = 0; k < elements.length; k++) {
      if (countS === M - 1) break;
      const idx = elements[k];
      const startM = Math.ceil(idx / 2);
      if (startM < M) {
        const minSlack = tree.query(1, 0, M - 1, startM, M - 1);
        if (minSlack > 0) {
          tree.update(1, 0, M - 1, startM, M - 1, -1);
          S[idx] = 1;
          countS++;
        }
      }
    }

    let totalScore = 0n;
    for (let i = 0; i < n; i++) {
      if (i >= limit || S[i] === 1) totalScore -= BigInt(a[i]);
      else totalScore += BigInt(a[i]);
    }
    out.push(totalScore.toString());
  }
  console.log(out.join('\n'));
}
solve();