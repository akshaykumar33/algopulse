const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

const t = parseInt(input[0], 10);
const out = [];
for (let i = 1; i <= t; i++) {
  if (!input[i]) continue;
  const [x, y, z] = input[i].trim().split(/\s+/).map(Number);
  
  if ((x * y) % z === 0) {
    out.push((x * y) + ' ' + z);
  } else if ((x * z) % y === 0) {
    out.push((x * z) + ' ' + y);
  } else if ((y * z) % x === 0) {
    out.push((y * z) + ' ' + x);
  } else {
    out.push(-1);
  }
}
console.log(out.join('\n'));
