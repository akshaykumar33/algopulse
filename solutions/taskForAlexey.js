const fs = require('fs');

function gcd(a, b) {
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < input.length && !input[lineIdx].trim()) lineIdx++;
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++].trim(), 10);
    const a = input[lineIdx++].trim().split(/\s+/).map(BigInt);

    let minLcm = null;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const cur = lcm(a[i], a[j]);
        if (minLcm === null || cur < minLcm) {
          minLcm = cur;
        }
      }
    }

    out.push(minLcm.toString());
  }

  console.log(out.join('\n'));
}

solve();

