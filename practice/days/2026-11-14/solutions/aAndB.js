const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const diff = Math.abs(a - b);

    let k = 0;
    let sum = 0;
    while (sum < diff || (sum - diff) % 2 !== 0) {
      k++;
      sum += k;
    }
    out.push(k);
  }
  console.log(out.join('\n'));
}

solve();
