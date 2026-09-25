const fs = require('fs');
const buffer = fs.readFileSync(0);
let offset = 0;

function nextInt() {
  while (offset < buffer.length && buffer[offset] <= 32) offset++;
  if (offset >= buffer.length) return null;
  let res = 0;
  while (offset < buffer.length && buffer[offset] > 32) {
    res = res * 10 + (buffer[offset] - 48);
    offset++;
  }
  return res;
}

const MAXN = 200005;
const b = new Int32Array(MAXN);
const last = new Int32Array(MAXN);
const dpLeft = new Int32Array(MAXN);
const dpRight = new Int32Array(MAXN);

const minTree = new Int32Array(4 * MAXN);
const chmaxTreeL = new Int32Array(4 * MAXN);
const chmaxTreeR = new Int32Array(4 * MAXN);

function buildMin(node, l, r) {
  if (l === r) {
    minTree[node] = last[l];
    return;
  }
  const mid = (l + r) >> 1;
  buildMin(node << 1, l, mid);
  buildMin((node << 1) | 1, mid + 1, r);
  minTree[node] = Math.min(minTree[node << 1], minTree[(node << 1) | 1]);
}

function findFirst(node, l, r, ql, qr, val) {
  if (l > qr || r < ql || minTree[node] >= val) return -1;
  if (l === r) return l;
  const mid = (l + r) >> 1;
  const leftRes = findFirst(node << 1, l, mid, ql, qr, val);
  if (leftRes !== -1) return leftRes;
  return findFirst((node << 1) | 1, mid + 1, r, ql, qr, val);
}

function findLast(node, l, r, ql, qr, val) {
  if (l > qr || r < ql || minTree[node] >= val) return -1;
  if (l === r) return l;
  const mid = (l + r) >> 1;
  const rightRes = findLast((node << 1) | 1, mid + 1, r, ql, qr, val);
  if (rightRes !== -1) return rightRes;
  return findLast(node << 1, l, mid, ql, qr, val);
}

function updateChmax(tree, node, l, r, ql, qr, val) {
  if (l > qr || r < ql) return;
  if (ql <= l && r <= qr) {
    if (val > tree[node]) tree[node] = val;
    return;
  }
  const mid = (l + r) >> 1;
  updateChmax(tree, node << 1, l, mid, ql, qr, val);
  updateChmax(tree, (node << 1) | 1, mid + 1, r, ql, qr, val);
}

function queryChmax(tree, node, l, r, pos) {
  let res = tree[node];
  if (l === r) return res;
  const mid = (l + r) >> 1;
  if (pos <= mid) {
    res = Math.max(res, queryChmax(tree, node << 1, l, mid, pos));
  } else {
    res = Math.max(res, queryChmax(tree, (node << 1) | 1, mid + 1, r, pos));
  }
  return res;
}

const output = [];

function solve() {
  const T = nextInt();
  if (T === null) return;

  for (let t = 0; t < T; t++) {
    const n = nextInt();
    const m = nextInt();

    for (let i = 1; i <= n; i++) last[i] = -1;

    for (let i = 0; i < m; i++) {
      b[i] = nextInt();
      last[b[i]] = i;
    }

    let possible = true;
    for (let i = 1; i <= n; i++) {
      if (last[i] === -1) {
        possible = false;
        break;
      }
    }

    if (!possible) {
      output.push(-1);
      continue;
    }

    buildMin(1, 1, n);

    const treeSize = 4 * (n + 1);
    chmaxTreeL.fill(-1000, 0, treeSize);
    chmaxTreeR.fill(-1000, 0, treeSize);

    // Compute dpLeft
    for (let i = m - 1; i >= 0; i--) {
      const u = b[i];
      if (u === 1) {
        dpLeft[i] = 0;
      } else {
        dpLeft[i] = queryChmax(chmaxTreeL, 1, 1, n, u);
      }

      if (dpLeft[i] >= 0 && u < n) {
        let rLim = findFirst(1, 1, n, u + 1, n, i);
        if (rLim === -1) rLim = n;
        updateChmax(chmaxTreeL, 1, 1, n, u + 1, rLim, 1 + dpLeft[i]);
      }
    }

    // Compute dpRight
    for (let i = m - 1; i >= 0; i--) {
      const u = b[i];
      if (u === n) {
        dpRight[i] = 0;
      } else {
        dpRight[i] = queryChmax(chmaxTreeR, 1, 1, n, u);
      }

      if (dpRight[i] >= 0 && u > 1) {
        let lLim = findLast(1, 1, n, 1, u - 1, i);
        if (lLim === -1) lLim = 1;
        updateChmax(chmaxTreeR, 1, 1, n, lLim, u - 1, 1 + dpRight[i]);
      }
    }

    let maxK = 1;
    for (let i = 0; i < m; i++) {
      if (dpLeft[i] >= 0 && dpRight[i] >= 0) {
        const k = 1 + dpLeft[i] + dpRight[i];
        if (k > maxK) maxK = k;
      }
    }

    output.push(n - maxK);
  }

  process.stdout.write(output.join('\n') + '\n');
}

solve();
