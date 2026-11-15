const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  let D = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      D++;
      if (i * i !== n) D++;
    }
  }
  if (n % 2 === 0) {
    out.push(2 * D - 3);
  } else {
    out.push(2 * D - 2);
  }
}
console.log(out.join('\n'));
