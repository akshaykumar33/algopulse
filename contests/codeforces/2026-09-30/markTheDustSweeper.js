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

  let firstNonZero = -1;
  for (let i = 0; i < n - 1; i++) {
    if (a[i] > 0) {
      firstNonZero = i;
      break;
    }
  }

  if (firstNonZero === -1) {
    out.push(0);
    continue;
  }

  let ops = 0;
  for (let i = firstNonZero; i < n - 1; i++) {
    if (a[i] === 0) {
      ops += 1;
    } else {
      ops += a[i];
    }
  }
  out.push(ops);
}
console.log(out.join('\n'));
