const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const k = Number(input[ptr++]);
    let minVal = Infinity;
    let maxVal = -Infinity;
    for (let i = 0; i < n; i++) {
      const val = Number(input[ptr++]);
      if (val < minVal) minVal = val;
      if (val > maxVal) maxVal = val;
    }

    if (n === 1 || minVal + maxVal <= k) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

