const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let cnt4 = n - (n % 7);
    while (cnt4 >= 0 && (n - cnt4) % 4 !== 0) {
      cnt4 -= 7;
    }

    if (cnt4 >= 0) {
      out.push(cnt4);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();
