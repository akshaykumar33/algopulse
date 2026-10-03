const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = parseInt(input[ptr++], 10);

    let countLess = 0;
    let countGreater = 0;

    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v < a) countLess++;
      else if (v > a) countGreater++;
    }

    if (countGreater > countLess) {
      out.push(a + 1);
    } else {
      out.push(a - 1 >= 0 ? a - 1 : a + 1);
    }
  }

  console.log(out.join('\n'));
}

solve();
