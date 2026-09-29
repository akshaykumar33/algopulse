const fs = require('fs');

function solve() {
  const content = fs.readFileSync(0, 'utf-8').trim();
  if (!content) return;
  const lines = content.split(/\r?\n/);
  let lineIdx = 0;
  const output = [];

  while (lineIdx < lines.length) {
    const lineN = lines[lineIdx++].trim();
    if (!lineN) continue;
    const n = parseInt(lineN, 10);
    if (isNaN(n) || n <= 0) break;

    let minH = Infinity;
    let sum = 0;
    let count = 0;

    while (lineIdx < lines.length && count < n) {
      const parts = lines[lineIdx++].trim().split(/\s+/);
      for (let i = 0; i < parts.length; i++) {
        if (!parts[i]) continue;
        const h = parseInt(parts[i], 10);
        if (h < minH) minH = h;
        sum += h;
        count++;
        if (count === n) break;
      }
    }

    const ans = sum - n * minH;
    output.push(ans);
  }

  if (output.length > 0) {
    console.log(output.join('\n'));
  }
}

solve();
