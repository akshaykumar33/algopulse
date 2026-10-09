const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || lines[0] === '') return;

  let lineIdx = 0;
  let t = parseInt(lines[lineIdx++], 10);
  const out = [];

  while (t-- > 0) {
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++], 10);
    const arr = lines[lineIdx++].trim().split(/\s+/).map(Number);

    if (n <= 1) {
      out.push(0);
      continue;
    }

    const first = new Map();
    const last = new Map();

    for (let i = 0; i < n; i++) {
      const v = arr[i];
      if (!first.has(v)) first.set(v, i);
      last.set(v, i);
    }

    let minSwaps = Infinity;
    for (const [v, firstIdx] of first.entries()) {
      const lastIdx = last.get(v);
      if (firstIdx !== lastIdx) {
        const swaps = firstIdx + (n - 1 - lastIdx);
        if (swaps < minSwaps) {
          minSwaps = swaps;
        }
      }
    }

    out.push(minSwaps === Infinity ? -1 : minSwaps);
  }

  console.log(out.join('\n'));
}

solve();
