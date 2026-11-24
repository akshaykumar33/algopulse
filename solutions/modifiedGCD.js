const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  let a = parseInt(tokens[ptr++], 10);
  let b = parseInt(tokens[ptr++], 10);
  let x = a, y = b;
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  const g = x;
  const divs = [];
  for (let i = 1; i * i <= g; i++) {
    if (g % i === 0) {
      divs.push(i);
      if (i * i !== g) divs.push(Math.floor(g / i));
    }
  }
  divs.sort((u, v) => u - v);
  const n = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let q = 0; q < n; q++) {
    const low = parseInt(tokens[ptr++], 10);
    const high = parseInt(tokens[ptr++], 10);
    let l = 0, r = divs.length - 1, best = -1;
    while (l <= r) {
      const mid = (l + r) >> 1;
      if (divs[mid] <= high) {
        best = divs[mid];
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    if (best >= low) out.push(best);
    else out.push(-1);
  }
  console.log(out.join('\n'));
}

solve();
