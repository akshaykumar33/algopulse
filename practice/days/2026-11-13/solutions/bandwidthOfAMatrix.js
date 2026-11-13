const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let ones = 0;
    const totalCells = n * n;
    for (let i = 0; i < totalCells; i++) {
      if (input[ptr++] === '1') ones++;
    }
    let capacity = n;
    let k = 0;
    while (capacity < ones) {
      k++;
      capacity += 2 * (n - k);
    }
    out.push(k.toString());
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
