const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const s = input[ptr++];
    if (s.length % 2 !== 0) {
      out.push(-1);
      continue;
    }
    let c0 = 0, c1 = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '0') c0++;
      else c1++;
    }
    if (c0 === 0 || c1 === 0) {
      out.push(-1);
    } else {
      out.push(Math.abs(c0 - c1) / 2);
    }
  }

  console.log(out.join('\n'));
}

solve();
