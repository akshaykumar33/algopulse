const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

const t = parseInt(input[0], 10);
const out = [];

for (let i = 1; i <= t; i++) {
  if (!input[i]) continue;
  const n = parseInt(input[i].trim(), 10);
  let count = 0;
  for (let len = 1; len <= 9; len++) {
    for (let d = 1; d <= 9; d++) {
      const val = Number(String(d).repeat(len));
      if (val <= n) count++;
    }
  }
  out.push(count);
}
console.log(out.join('\n'));
