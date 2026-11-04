const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < input.length && !input[lineIdx].trim()) lineIdx++;
    if (lineIdx >= input.length) break;
    const [n, m] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const kArr = [];
    for (let i = 0; i < n; i++) {
      kArr.push(parseInt(input[lineIdx++].trim(), 10));
    }
    kArr.sort((u, v) => u - v);

    for (let j = 0; j < m; j++) {
      const [a, b, c] = input[lineIdx++].trim().split(/\s+/).map(Number);
      const fourAC = 4n * BigInt(a) * BigInt(c);
      if (fourAC <= 0n) {
        out.push('NO');
        continue;
      }

      let low = 0;
      let high = n - 1;
      let pos = n;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (kArr[mid] >= b) {
          pos = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }

      let found = null;
      if (pos < n) {
        const diff = BigInt(b) - BigInt(kArr[pos]);
        if (diff * diff < fourAC) found = kArr[pos];
      }
      if (found === null && pos > 0) {
        const diff = BigInt(b) - BigInt(kArr[pos - 1]);
        if (diff * diff < fourAC) found = kArr[pos - 1];
      }

      if (found !== null) {
        out.push('YES');
        out.push(found);
      } else {
        out.push('NO');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
