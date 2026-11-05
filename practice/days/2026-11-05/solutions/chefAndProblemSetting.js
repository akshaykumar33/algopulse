const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    let isInvalid = false;
    let isWeak = false;

    for (let i = 0; i < n; i++) {
      const type = input[ptr++];
      const bits = input[ptr++];

      if (type === 'correct') {
        if (bits.includes('0')) {
          isInvalid = true;
        }
      } else if (type === 'wrong') {
        if (!bits.includes('0')) {
          isWeak = true;
        }
      }
    }

    if (isInvalid) {
      out.push('INVALID');
    } else if (isWeak) {
      out.push('WEAK');
    } else {
      out.push('FINE');
    }
  }

  console.log(out.join('\n'));
}

solve();
