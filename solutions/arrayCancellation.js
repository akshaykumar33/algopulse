const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    let bal = 0;
    for (let j = 0; j < n; j++) {
      const x = parseInt(input[ptr++], 10);
      bal = Math.max(0, bal + x);
    }
    out.push(bal);
  }

  console.log(out.join('\n'));
}

solve();
