const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
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
    const a = input[lineIdx++].trim().split(/\s+/).map(Number);

    a.sort((x, y) => x - y);
    let g = 360;
    for (let i = 0; i < n - 1; i++) {
      g = gcd(g, a[i + 1] - a[i]);
    }
    g = gcd(g, 360 - a[n - 1] + a[0]);

    const totalCuts = Math.floor(360 / g);
    out.push(totalCuts - n);
  }

  console.log(out.join('\n'));
}

solve();

