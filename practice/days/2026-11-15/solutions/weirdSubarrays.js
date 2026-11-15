const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const P = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    P[i] = parseInt(input[ptr++], 10);
  }

  let start = 0;
  let total = 0;
  for (let i = 0; i < n; i++) {
    if (i >= 2 && P[i - 2] < P[i - 1] && P[i - 1] > P[i]) {
      start = i - 1;
    }
    total += (i - start + 1);
  }
  out.push(total);
}
console.log(out.join('\n'));
