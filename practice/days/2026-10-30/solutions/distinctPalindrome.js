const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const x = parseInt(input[ptr++], 10);
    const half = Math.ceil(n / 2);

    if (x > half || x > 26) {
      out.push('-1');
      continue;
    }

    const firstHalf = [];
    for (let i = 0; i < half; i++) {
      const charCode = 97 + Math.min(i, x - 1);
      firstHalf.push(String.fromCharCode(charCode));
    }

    const s = new Array(n);
    for (let i = 0; i < half; i++) {
      s[i] = firstHalf[i];
      s[n - 1 - i] = firstHalf[i];
    }

    out.push(s.join(''));
  }

  console.log(out.join('\n'));
}

solve();

