const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const d = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    let present = 0;
    for (let i = 0; i < d; i++) {
      if (s[i] === 'P') present++;
    }

    const needed = Math.ceil(0.75 * d);
    if (present >= needed) {
      out.push(0);
      continue;
    }

    let available = 0;
    for (let i = 2; i < d - 2; i++) {
      if (s[i] === 'A') {
        const leftP = s[i - 1] === 'P' || s[i - 2] === 'P';
        const rightP = s[i + 1] === 'P' || s[i + 2] === 'P';
        if (leftP && rightP) {
          available++;
        }
      }
    }

    if (present + available >= needed) {
      out.push(needed - present);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();
