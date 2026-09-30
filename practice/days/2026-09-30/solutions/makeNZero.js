const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

const t = parseInt(input[0], 10);
const out = [];
for (let i = 1; i <= t; i++) {
  if (!input[i]) continue;
  const n = parseInt(input[i].trim(), 10);
  if (n === 1 || n === 2 || n === 5) {
    out.push('NO');
  } else {
    out.push('YES');
  }
}
console.log(out.join('\n'));
