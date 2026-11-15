const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const x = Number(input[ptr++]);

  let possible = false;
  for (let L = 1; L <= n; L++) {
    if (x % L === 0) {
      const M = Math.floor(x / L);
      if (M <= n - L + 1) {
        possible = true;
        break;
      }
    }
  }
  out.push(possible ? 'YES' : 'NO');
}
console.log(out.join('\n'));
