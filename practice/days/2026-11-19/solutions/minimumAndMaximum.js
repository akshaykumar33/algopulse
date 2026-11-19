const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const kStr = input[ptr++];

  let k = 0;
  for (let i = 0; i < kStr.length; i++) {
    k = (k * 10 + (kStr.charCodeAt(i) - 48)) % n;
  }

  const c1 = k;
  const c0 = n - c1;

  if (c1 === 0) {
    out.push(0);
  } else if (c1 < c0) {
    out.push(2 * c1);
  } else if (c0 < c1) {
    out.push(2 * c0);
  } else {
    out.push(2 * c1 - 1);
  }
}
console.log(out.join('\n'));
