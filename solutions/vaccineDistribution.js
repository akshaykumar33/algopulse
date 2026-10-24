const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);

    let risk = 0;
    let normal = 0;

    for (let i = 0; i < n; i++) {
      const age = parseInt(input[ptr++], 10);
      if (age >= 80 || age <= 9) {
        risk++;
      } else {
        normal++;
      }
    }

    const days = Math.ceil(risk / d) + Math.ceil(normal / d);
    out.push(days);
  }

  console.log(out.join('\n'));
}

solve();
