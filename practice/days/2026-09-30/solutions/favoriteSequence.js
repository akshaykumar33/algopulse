const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

let lineIdx = 0;
const t = parseInt(input[lineIdx++], 10);
const out = [];

for (let tc = 0; tc < t; tc++) {
  if (lineIdx >= input.length) break;
  const n = parseInt(input[lineIdx++].trim(), 10);
  const b = input[lineIdx++].trim().split(/\s+/).map(Number);
  const a = [];
  let l = 0, r = n - 1;
  while (l <= r) {
    a.push(b[l++]);
    if (l <= r) {
      a.push(b[r--]);
    }
  }
  out.push(a.join(' '));
}
console.log(out.join('\n'));
