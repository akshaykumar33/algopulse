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
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }
    const b = [];
    for (let i = 0; i < n; i++) {
      b.push(parseInt(input[ptr++], 10));
    }

    let posA = 0;
    let posB = 0;
    let weirdDist = 0;

    for (let i = 0; i < n; i++) {
      if (posA === posB && a[i] === b[i]) {
        weirdDist += a[i];
      }
      posA += a[i];
      posB += b[i];
    }

    out.push(weirdDist);
  }

  console.log(out.join('\n'));
}

solve();
