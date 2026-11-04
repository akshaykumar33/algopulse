const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;

  const n = parseInt(input[ptr++], 10);
  const w = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) {
    w[i] = parseFloat(input[ptr++]);
  }

  const p = new Int32Array(n + 1);
  let root = -1;
  const head = new Int32Array(n + 1).fill(-1);
  const next = new Int32Array(n + 1);
  const to = new Int32Array(n + 1);
  let edgeCount = 0;

  for (let i = 1; i <= n; i++) {
    const parent = parseInt(input[ptr++], 10);
    p[i] = parent;
    if (parent === -1) {
      root = i;
    } else {
      to[edgeCount] = i;
      next[edgeCount] = head[parent];
      head[parent] = edgeCount++;
    }
  }

  let maxDiff = 0;
  const queueNode = new Int32Array(n + 1);
  const queueMin = new Float64Array(n + 1);
  const queueMax = new Float64Array(n + 1);
  let qHead = 0;
  let qTail = 0;

  queueNode[qTail] = root;
  queueMin[qTail] = w[root];
  queueMax[qTail] = w[root];
  qTail++;

  while (qHead < qTail) {
    const u = queueNode[qHead];
    const minAnc = queueMin[qHead];
    const maxAnc = queueMax[qHead];
    qHead++;

    let e = head[u];
    while (e !== -1) {
      const v = to[e];
      const val = w[v];

      const diff1 = Math.abs(val - minAnc);
      const diff2 = Math.abs(val - maxAnc);
      if (diff1 > maxDiff) maxDiff = diff1;
      if (diff2 > maxDiff) maxDiff = diff2;

      queueNode[qTail] = v;
      queueMin[qTail] = val < minAnc ? val : minAnc;
      queueMax[qTail] = val > maxAnc ? val : maxAnc;
      qTail++;

      e = next[e];
    }
  }

  console.log(maxDiff);
}

solve();
