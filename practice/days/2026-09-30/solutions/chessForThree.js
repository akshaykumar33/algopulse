const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

const t = parseInt(input[0], 10);
const out = [];
for (let i = 1; i <= t; i++) {
  if (!input[i]) continue;
  const [p1, p2, p3] = input[i].trim().split(/\s+/).map(Number);
  const sum = p1 + p2 + p3;
  if (sum % 2 !== 0) {
    out.push(-1);
  } else {
    out.push(Math.min(p1 + p2, Math.floor(sum / 2)));
  }
}
console.log(out.join('\n'));
