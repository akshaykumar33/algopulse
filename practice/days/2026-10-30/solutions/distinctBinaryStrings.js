const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    let blocks = 1;
    for (let i = 1; i < n; i++) {
      if (s[i] !== s[i - 1]) {
        blocks++;
      }
    }
    out.push(blocks);
  }

  console.log(out.join('\n'));
}

solve();
