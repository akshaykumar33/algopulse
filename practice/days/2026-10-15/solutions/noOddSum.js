const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    let c1 = 0;
    let c2 = 0;
    for (let j = 0; j < n; j++) {
      const val = parseInt(input[ptr++], 10);
      if (val === 1) c1++;
      else if (val === 2) c2++;
    }

    let ans;
    if (c1 % 2 === 0) {
      ans = Math.min(c2, c1 / 2);
    } else {
      ans = c2;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
