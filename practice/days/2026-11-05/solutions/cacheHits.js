const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    let currentBlock = -1;
    let ans = 0;

    for (let i = 0; i < m; i++) {
      const x = parseInt(input[ptr++], 10);
      const blk = Math.floor(x / b);
      if (blk !== currentBlock) {
        ans++;
        currentBlock = blk;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

