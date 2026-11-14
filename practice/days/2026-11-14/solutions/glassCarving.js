const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  let ptr = 0;
  const w = parseInt(input[ptr++], 10);
  const h = parseInt(input[ptr++], 10);
  const n = parseInt(input[ptr++], 10);

  const cuts = [];
  const xUsed = new Uint8Array(w + 1);
  const yUsed = new Uint8Array(h + 1);

  for (let i = 0; i < n; i++) {
    const type = input[ptr++];
    const pos = parseInt(input[ptr++], 10);
    cuts.push({ type, pos });
    if (type === 'H') yUsed[pos] = 1;
    else xUsed[pos] = 1;
  }

  const pX = new Int32Array(w + 1);
  const szX = new Int32Array(w + 1);
  for (let i = 0; i <= w; i++) { pX[i] = i; szX[i] = 1; }

  function findX(i) {
    let root = i;
    while (root !== pX[root]) root = pX[root];
    let curr = i;
    while (curr !== root) {
      const next = pX[curr];
      pX[curr] = root;
      curr = next;
    }
    return root;
  }

  function unionX(i, j) {
    const rootI = findX(i);
    const rootJ = findX(j);
    if (rootI !== rootJ) {
      pX[rootJ] = rootI;
      szX[rootI] += szX[rootJ];
      return szX[rootI];
    }
    return szX[rootI];
  }

  for (let i = 1; i < w; i++) {
    if (!xUsed[i]) unionX(i - 1, i);
  }

  const pY = new Int32Array(h + 1);
  const szY = new Int32Array(h + 1);
  for (let i = 0; i <= h; i++) { pY[i] = i; szY[i] = 1; }

  function findY(i) {
    let root = i;
    while (root !== pY[root]) root = pY[root];
    let curr = i;
    while (curr !== root) {
      const next = pY[curr];
      pY[curr] = root;
      curr = next;
    }
    return root;
  }

  function unionY(i, j) {
    const rootI = findY(i);
    const rootJ = findY(j);
    if (rootI !== rootJ) {
      pY[rootJ] = rootI;
      szY[rootI] += szY[rootJ];
      return szY[rootI];
    }
    return szY[rootI];
  }

  for (let i = 1; i < h; i++) {
    if (!yUsed[i]) unionY(i - 1, i);
  }

  let maxW = 1;
  for (let i = 0; i < w; i++) {
    if (findX(i) === i && szX[i] > maxW) maxW = szX[i];
  }
  let maxH = 1;
  for (let i = 0; i < h; i++) {
    if (findY(i) === i && szY[i] > maxH) maxH = szY[i];
  }

  const ans = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    ans[i] = BigInt(maxW) * BigInt(maxH);
    const { type, pos } = cuts[i];
    if (type === 'H') {
      const newSz = unionY(pos - 1, pos);
      if (newSz > maxH) maxH = newSz;
    } else {
      const newSz = unionX(pos - 1, pos);
      if (newSz > maxW) maxW = newSz;
    }
  }

  console.log(ans.map(v => v.toString()).join('\n'));
}

solve();
