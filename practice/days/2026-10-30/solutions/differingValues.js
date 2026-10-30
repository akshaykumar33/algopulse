const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    let c0 = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') c0++;
    }

    let minZeros = 0;
    let maxZeros = 0;

    for (let rem = 0; rem < k; rem++) {
      const len = Math.floor((n - 1 - rem) / k) + 1;
      if (len <= 0) continue;
      if (len % 2 === 0) {
        minZeros += len / 2;
        maxZeros += len / 2;
      } else {
        minZeros += Math.floor(len / 2);
        maxZeros += Math.ceil(len / 2);
      }
    }

    if (c0 >= minZeros && c0 <= maxZeros) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();
