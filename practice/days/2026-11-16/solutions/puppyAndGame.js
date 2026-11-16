const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    if (a % 2 === 0 || b % 2 === 0) {
      out.push("Tuzik");
    } else {
      out.push("Vanka");
    }
  }
  console.log(out.join('\n'));
}

solve();
