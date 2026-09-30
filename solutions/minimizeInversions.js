const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

let lineIdx = 0;
const t = parseInt(input[lineIdx++], 10);
const out = [];

for (let tc = 0; tc < t; tc++) {
  if (lineIdx >= input.length) break;
  const n = parseInt(input[lineIdx++].trim(), 10);
  const a = input[lineIdx++].trim().split(/\s+/).map(Number);
  const b = input[lineIdx++].trim().split(/\s+/).map(Number);
  
  const pairs = [];
  for (let i = 0; i < n; i++) {
    pairs.push({ a: a[i], b: b[i] });
  }
  pairs.sort((x, y) => x.a - y.a);

  out.push(pairs.map(p => p.a).join(' '));
  out.push(pairs.map(p => p.b).join(' '));
}
console.log(out.join('\n'));
