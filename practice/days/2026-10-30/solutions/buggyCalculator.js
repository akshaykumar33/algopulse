const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let a = parseInt(input[ptr++], 10);
    let b = parseInt(input[ptr++], 10);
    let ans = 0;
    let place = 1;

    while (a > 0 || b > 0) {
      const d = ((a % 10) + (b % 10)) % 10;
      ans += d * place;
      place *= 10;
      a = Math.floor(a / 10);
      b = Math.floor(b / 10);
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
