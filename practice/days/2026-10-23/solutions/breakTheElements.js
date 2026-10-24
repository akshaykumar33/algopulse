const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let evenCount = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v % 2 === 0) evenCount++;
    }

    if (evenCount === n || evenCount === 0) {
      out.push(0);
    } else {
      out.push(evenCount);
    }
  }

  console.log(out.join('\n'));
}

solve();
