const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);

  let l = -2000000000;
  let r = 2000000000;

  for (let i = 0; i < n; i++) {
    const op = input[ptr++];
    const x = parseInt(input[ptr++], 10);
    const ans = input[ptr++];

    if (op === '>') {
      if (ans === 'Y') l = Math.max(l, x + 1);
      else r = Math.min(r, x);
    } else if (op === '>=') {
      if (ans === 'Y') l = Math.max(l, x);
      else r = Math.min(r, x - 1);
    } else if (op === '<') {
      if (ans === 'Y') r = Math.min(r, x - 1);
      else l = Math.max(l, x);
    } else if (op === '<=') {
      if (ans === 'Y') r = Math.min(r, x);
      else l = Math.max(l, x + 1);
    }
  }

  if (l <= r) {
    console.log(l);
  } else {
    console.log('Impossible');
  }
}

solve();
