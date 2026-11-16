const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    const p = input[ptr++];

    if (s === p) {
      out.push("YES");
      continue;
    }

    let zeros = 0, ones = 0;
    for (let i = 0; i < n; i++) {
      if (p[i] === '0') zeros++;
      else ones++;
    }

    if (zeros > 0 && ones > 0) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }
  console.log(out.join('\n'));
}

solve();
