const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const b = parseInt(tokens[ptr++], 10);
  const a = parseInt(tokens[ptr++], 10);

  let curB = b;
  let curA = a;
  let dist = 0;

  for (let i = 0; i < n; i++) {
    const s = parseInt(tokens[ptr++], 10);
    if (curB === 0 && curA === 0) break;

    if (s === 1) {
      if (curB > 0 && curA < a) {
        curB--;
        curA++;
      } else {
        curA--;
      }
    } else {
      if (curA > 0) {
        curA--;
      } else {
        curB--;
      }
    }
    dist++;
  }

  console.log(dist);
}

solve();
