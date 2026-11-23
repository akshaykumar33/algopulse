const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const first = input[ptr++];
    let c0 = 0;
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      const b = input[ptr++];
      if (b[0] === '0') {
        for (let j = 0; j < b.length; j++) {
          if (b[j] === '0') c0++;
        }
      } else {
        for (let j = 0; j < b.length; j++) {
          if (b[j] === '1') c1++;
        }
      }
    }
    if (first === 'Dee') {
      out.push(c0 > c1 ? 'Dee' : 'Dum');
    } else {
      out.push(c1 > c0 ? 'Dum' : 'Dee');
    }
  }
  console.log(out.join('\n'));
}

solve();
