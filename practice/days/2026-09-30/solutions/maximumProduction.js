const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

const t = parseInt(input[0], 10);
const out = [];
for (let i = 1; i <= t; i++) {
  if (!input[i]) continue;
  const [d, x, y, z] = input[i].trim().split(/\s+/).map(Number);
  const opt1 = 7 * x;
  const opt2 = d * y + (7 - d) * z;
  out.push(Math.max(opt1, opt2));
}
console.log(out.join('\n'));
