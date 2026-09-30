const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

let lineIdx = 0;
const t = parseInt(input[lineIdx++], 10);
const out = [];

const map = {
  '00': 'A',
  '01': 'T',
  '10': 'C',
  '11': 'G'
};

for (let tc = 0; tc < t; tc++) {
  if (lineIdx >= input.length) break;
  const n = parseInt(input[lineIdx++].trim(), 10);
  const s = input[lineIdx++].trim();
  let res = '';
  for (let i = 0; i < n; i += 2) {
    const pair = s.slice(i, i + 2);
    res += map[pair] || '';
  }
  out.push(res);
}
console.log(out.join('\n'));
