const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
      sum += s.charCodeAt(i) - 48;
    }
    const rem = sum % 9;
    if (rem === 0) {
      out.push('0');
      continue;
    }

    if (s.length === 1) {
      out.push(Math.min(sum, 9 - sum).toString());
    } else {
      if (sum < 9) {
        out.push((9 - rem).toString());
      } else {
        out.push(Math.min(rem, 9 - rem).toString());
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
