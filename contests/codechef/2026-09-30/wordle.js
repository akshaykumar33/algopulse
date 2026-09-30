const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

let lineIdx = 0;
const t = parseInt(input[lineIdx++], 10);
const out = [];

for (let tc = 0; tc < t; tc++) {
  if (lineIdx >= input.length) break;
  const s = input[lineIdx++].trim();
  const target = input[lineIdx++].trim();
  let m = '';
  for (let i = 0; i < 5; i++) {
    m += (s[i] === target[i] ? 'G' : 'B');
  }
  out.push(m);
}
console.log(out.join('\n'));
