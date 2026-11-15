const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n0 = parseInt(input[ptr++], 10);
    const n1 = parseInt(input[ptr++], 10);
    const n2 = parseInt(input[ptr++], 10);

    if (n1 === 0) {
      if (n0 > 0) out.push('0'.repeat(n0 + 1));
      else out.push('1'.repeat(n2 + 1));
      continue;
    }

    let s = '1'.repeat(n2 + 1) + '0'.repeat(n0 + 1);
    let cur = '1';
    for (let i = 0; i < n1 - 1; i++) {
      s += cur;
      cur = cur === '1' ? '0' : '1';
    }
    out.push(s);
  }
  console.log(out.join('\n'));
}

solve();
