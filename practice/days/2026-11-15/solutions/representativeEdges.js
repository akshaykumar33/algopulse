const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

    if (n <= 2) {
      out.push(0);
      continue;
    }

    let maxMatch = 1;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let match = 0;
        const diff = a[j] - a[i];
        const step = j - i;
        for (let k = 0; k < n; k++) {
          if ((a[k] - a[i]) * step === diff * (k - i)) match++;
        }
        if (match > maxMatch) maxMatch = match;
      }
    }
    out.push(n - maxMatch);
  }
  console.log(out.join('\n'));
}

solve();
