const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let x = 0;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10 + buf[ptr] - 48;
    ptr++;
  }
  return x;
}

const out = [];

function solve() {
  const n = nextInt();
  const m = nextInt();
  const total = n * m;
  const a = new Int32Array(total);
  for (let i = 0; i < total; i++) a[i] = nextInt();
  const rRank = new Int32Array(total);
  const cRank = new Int32Array(total);
  const rMax = new Int32Array(n);
  const cMax = new Int32Array(m);

  const rowIdx = Array.from({ length: m }, (_, i) => i);
  for (let i = 0; i < n; i++) {
    const base = i * m;
    rowIdx.sort((x, y) => a[base + x] - a[base + y]);
    let rk = 0;
    let prev = -1;
    for (let k = 0; k < m; k++) {
      const j = rowIdx[k];
      const v = a[base + j];
      if (v !== prev) {
        rk++;
        prev = v;
      }
      rRank[base + j] = rk;
    }
    rMax[i] = rk;
  }

  const colIdx = Array.from({ length: n }, (_, i) => i);
  for (let j = 0; j < m; j++) {
    colIdx.sort((x, y) => a[x * m + j] - a[y * m + j]);
    let rk = 0;
    let prev = -1;
    for (let k = 0; k < n; k++) {
      const i = colIdx[k];
      const v = a[i * m + j];
      if (v !== prev) {
        rk++;
        prev = v;
      }
      cRank[i * m + j] = rk;
    }
    cMax[j] = rk;
  }

  for (let i = 0; i < n; i++) {
    const row = new Int32Array(m);
    const base = i * m;
    for (let j = 0; j < m; j++) {
      const rr = rRank[base + j];
      const cr = cRank[base + j];
      const lo = rr > cr ? rr : cr;
      const hiR = rMax[i] - rr;
      const hiC = cMax[j] - cr;
      const hi = hiR > hiC ? hiR : hiC;
      row[j] = lo + hi;
    }
    out.push(row.join(' '));
  }
}

solve();
console.log(out.join('\n'));
