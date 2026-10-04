const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = Number(input[0]);
  const r = Number(input[1]);
  let ptr = 2;
  const out = [];

  for (let i = 0; i < n; i++) {
    const val = Number(input[ptr++]);
    if (val >= r) {
      out.push('Good boi');
    } else {
      out.push('Bad boi');
    }
  }

  console.log(out.join('\n'));
}

solve();
