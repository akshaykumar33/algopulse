const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = input[ptr++];
    out.push(`1 ${n}`);
  }
  console.log(out.join('\n'));
}

solve();
