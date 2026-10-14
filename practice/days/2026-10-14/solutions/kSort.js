const fs = require('fs');

const solve = () => {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++], 10);
    const a = input[lineIdx++].trim().split(/\s+/).map(Number);

    let maxDiff = 0;
    let sumDiff = 0;
    let curMax = a[0];

    for (let i = 1; i < n; i++) {
      if (a[i] < curMax) {
        const d = curMax - a[i];
        sumDiff += d;
        if (d > maxDiff) maxDiff = d;
      } else {
        curMax = a[i];
      }
    }
    out.push(sumDiff + maxDiff);
  }
  console.log(out.join('\n'));
};

solve();
