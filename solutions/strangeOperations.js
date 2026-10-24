const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += parseInt(input[ptr++], 10);
    }

    if (k === 1) {
      out.push(sum % 2 === 0 ? 'odd' : 'even');
    } else {
      out.push('even');
    }
  }

  console.log(out.join('\n'));
}

solve();
