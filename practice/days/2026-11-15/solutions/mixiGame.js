const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  let V = 0;
  for (let i = 0; i < n; i++) {
    const a = parseInt(input[ptr++], 10);
    if (a === 0) continue;
    if (i % 2 === 0) {
      if (V >= 0) V += 1;
      else V -= 1;
    } else {
      if (V > 0) V -= 1;
      else if (V < 0) V += 1;
      else V += 1;
    }
  }
  out.push(Math.abs(V) >= k ? 1 : 2);
}
console.log(out.join('\n'));
