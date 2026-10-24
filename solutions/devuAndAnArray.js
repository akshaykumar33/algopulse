const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const q = parseInt(input[ptr++], 10);

  let minVal = Infinity;
  let maxVal = -Infinity;

  for (let i = 0; i < n; i++) {
    const v = parseInt(input[ptr++], 10);
    if (v < minVal) minVal = v;
    if (v > maxVal) maxVal = v;
  }

  const out = [];
  for (let i = 0; i < q; i++) {
    const t = parseInt(input[ptr++], 10);
    if (t >= minVal && t <= maxVal) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();
