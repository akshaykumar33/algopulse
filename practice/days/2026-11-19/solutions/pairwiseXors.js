const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const X = parseInt(input[ptr++], 10);
    if (X % 2 !== 0 || (X & (X - 1)) === 0) {
      out.push(-1);
    } else {
      const Y = X >> 1;
      const L = Y & -Y;
      out.push(`0 ${L} ${Y}`);
    }
  }

  console.log(out.join('\n'));
}

solve();
