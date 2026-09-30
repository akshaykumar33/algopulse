const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

const t = parseInt(input[0], 10);
const out = [];
for (let i = 1; i <= t; i++) {
  if (!input[i]) continue;
  const [x, y] = input[i].trim().split(/\s+/).map(Number);
  out.push(Math.min(Math.floor(x / 2), y));
}
console.log(out.join('\n'));
