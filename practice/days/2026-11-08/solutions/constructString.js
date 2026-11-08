const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const u = input[ptr++];

    const res = [];
    let i = 0;
    while (i < n) {
      let j = i;
      while (j < n && u.charCodeAt(j) === u.charCodeAt(i)) {
        j++;
      }
      const len = j - i;
      if (len % 2 === 1) {
        res.push(u[i]);
      } else {
        res.push(u[i], u[i]);
      }
      i = j;
    }
    out.push(res.join(''));
  }

  console.log(out.join('\n'));
}

solve();
