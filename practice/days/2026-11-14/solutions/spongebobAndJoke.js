const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);

  const pos = new Int32Array(n + 1);
  const count = new Int32Array(n + 1);

  for (let i = 1; i <= n; i++) {
    const fVal = parseInt(input[ptr++], 10);
    pos[fVal] = i;
    count[fVal]++;
  }

  const a = new Int32Array(m);
  let hasAmbiguity = false;

  for (let i = 0; i < m; i++) {
    const bVal = parseInt(input[ptr++], 10);
    if (count[bVal] === 0) {
      console.log('Impossible');
      return;
    }
    if (count[bVal] > 1) {
      hasAmbiguity = true;
    }
    a[i] = pos[bVal];
  }

  if (hasAmbiguity) {
    console.log('Ambiguity');
  } else {
    console.log('Possible');
    console.log(a.join(' '));
  }
}

solve();
