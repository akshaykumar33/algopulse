const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
if (!input || !input[0]) process.exit(0);

let lineIdx = 0;
const t = parseInt(input[lineIdx++], 10);
const out = [];

for (let tc = 0; tc < t; tc++) {
  let maxPoints = -1;
  let bestPlayer = 1;
  for (let p = 1; p <= 22; p++) {
    if (lineIdx >= input.length) break;
    const [r, w] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const pts = r + 20 * w;
    if (pts > maxPoints) {
      maxPoints = pts;
      bestPlayer = p;
    }
  }
  out.push(bestPlayer);
}
console.log(out.join('\n'));
