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

function nextStr() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  const start = ptr;
  while (ptr < buf.length && buf[ptr] > 32) ptr++;
  return buf.toString('ascii', start, ptr);
}

const out = [];

function solve() {
  const n = nextInt();
  const s = nextStr();
  const code = new Uint8Array(n);
  for (let i = 0; i < n; i++) code[i] = s.charCodeAt(i) - 97;
  const stride = n + 1;
  const best = new Int32Array(26 * stride);
  for (let ch = 0; ch < 26; ch++) {
    const base = ch * stride;
    for (let l = 0; l < n; l++) {
      let diff = 0;
      for (let r = l; r < n; r++) {
        if (code[r] !== ch) diff++;
        const len = r - l + 1;
        if (len > best[base + diff]) best[base + diff] = len;
      }
    }
    for (let m = 1; m <= n; m++) {
      if (best[base + m - 1] > best[base + m]) {
        best[base + m] = best[base + m - 1];
      }
    }
  }
  const q = nextInt();
  for (let i = 0; i < q; i++) {
    const m = nextInt();
    const c = nextStr().charCodeAt(0) - 97;
    out.push(best[c * stride + m]);
  }
}

solve();
console.log(out.join('\n'));
