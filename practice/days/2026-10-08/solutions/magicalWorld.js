const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;

  let t = parseInt(input[0], 10);
  let lineIdx = 1;
  const out = [];

  while (t-- > 0) {
    if (lineIdx >= input.length) break;
    const [a, b, x] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const sqArea = x * x;
    const rectArea = a * b;

    if (rectArea <= sqArea) {
      out.push(0);
    } else if (Math.min(a, b) <= sqArea) {
      out.push(1);
    } else {
      out.push(2);
    }
  }

  console.log(out.join('\n'));
}

solve();
