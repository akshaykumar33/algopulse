const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const diff = new Int32Array(n + 2);
  for (let i = 1; i <= n; i++) {
    const c = parseInt(input[ptr++], 10);
    const l = Math.max(1, i - c);
    const r = Math.min(n, i + c);
    diff[l]++;
    diff[r + 1]--;
  }

  const rad = new Int32Array(n);
  let cur = 0;
  for (let i = 1; i <= n; i++) {
    cur += diff[i];
    rad[i - 1] = cur;
  }

  const H = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    H[i] = parseInt(input[ptr++], 10);
  }

  rad.sort();
  H.sort();

  let ok = true;
  for (let i = 0; i < n; i++) {
    if (rad[i] !== H[i]) {
      ok = false;
      break;
    }
  }
  out.push(ok ? 'YES' : 'NO');
}
console.log(out.join('\n'));
