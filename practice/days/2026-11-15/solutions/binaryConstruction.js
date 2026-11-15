const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  if (n === 2) out.push('01');
  else if (n === 3) out.push('001');
  else out.push('1' + '0'.repeat(n - 2) + '1');
}
console.log(out.join('\n'));
