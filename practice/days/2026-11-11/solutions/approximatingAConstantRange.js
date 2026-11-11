const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const arr = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = parseInt(tokens[ptr++], 10);
  }

  const maxQ = new Int32Array(n);
  const minQ = new Int32Array(n);
  let maxH = 0;
  let maxT = 0;
  let minH = 0;
  let minT = 0;

  let l = 0;
  let ans = 0;

  for (let r = 0; r < n; r++) {
    const v = arr[r];
    while (maxT > maxH && arr[maxQ[maxT - 1]] <= v) {
      maxT--;
    }
    maxQ[maxT++] = r;

    while (minT > minH && arr[minQ[minT - 1]] >= v) {
      minT--;
    }
    minQ[minT++] = r;

    while (arr[maxQ[maxH]] - arr[minQ[minH]] > 1) {
      l++;
      if (maxQ[maxH] < l) maxH++;
      if (minQ[minH] < l) minH++;
    }

    const len = r - l + 1;
    if (len > ans) ans = len;
  }

  console.log(ans);
}

solve();
