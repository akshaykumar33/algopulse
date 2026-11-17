const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);

  const present = new Uint8Array(1 << k);
  for (let i = 0; i < n; i++) {
    let mask = 0;
    for (let j = 0; j < k; j++) {
      if (parseInt(tokens[ptr++], 10) === 1) {
        mask |= (1 << j);
      }
    }
    present[mask] = 1;
  }

  if (present[0] === 1) {
    console.log('YES');
    return;
  }

  const limit = 1 << k;
  for (let i = 0; i < limit; i++) {
    if (!present[i]) continue;
    for (let j = 0; j < limit; j++) {
      if (!present[j]) continue;
      if ((i & j) === 0) {
        console.log('YES');
        return;
      }
    }
  }

  console.log('NO');
}

solve();
