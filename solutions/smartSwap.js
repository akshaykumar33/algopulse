const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const n = readInt();
  if (n === null) return;
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = readInt();
  }
  const k = readInt();

  const treeVal = new Int32Array(4 * n);
  const treeIdx = new Int32Array(4 * n);

  function build(node, l, r) {
    if (l === r) {
      treeVal[node] = a[l];
      treeIdx[node] = l;
      return;
    }
    const mid = (l + r) >> 1;
    const left = node << 1;
    const right = left | 1;
    build(left, l, mid);
    build(right, mid + 1, r);
    if (treeVal[right] <= treeVal[left]) {
      treeVal[node] = treeVal[right];
      treeIdx[node] = treeIdx[right];
    } else {
      treeVal[node] = treeVal[left];
      treeIdx[node] = treeIdx[left];
    }
  }

  build(1, 0, n - 1);

  function query(node, l, r, ql, qr) {
    if (ql <= l && r <= qr) {
      return { val: treeVal[node], idx: treeIdx[node] };
    }
    const mid = (l + r) >> 1;
    const left = node << 1;
    const right = left | 1;
    let res = null;
    if (ql <= mid) {
      res = query(left, l, mid, ql, qr);
    }
    if (qr > mid) {
      const rightRes = query(right, mid + 1, r, ql, qr);
      if (!res || rightRes.val <= res.val) {
        res = rightRes;
      }
    }
    return res;
  }

  for (let i = 0; i < n - 1; i++) {
    const r = Math.min(n - 1, i + k);
    const minObj = query(1, 0, n - 1, i + 1, r);
    if (minObj && minObj.val < a[i]) {
      const temp = a[i];
      a[i] = a[minObj.idx];
      a[minObj.idx] = temp;
      break;
    }
  }

  console.log(a.join(' '));
}

solve();
