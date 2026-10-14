const fs = require('fs');

const solve = () => {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = input[ptr++];
    const b = input[ptr++];

    let maxL = 0;
    const n = a.length;
    const m = b.length;

    for (let len = 1; len <= n; len++) {
      for (let i = 0; i <= n - len; i++) {
        const sub = a.substring(i, i + len);
        if (b.includes(sub)) {
          if (len > maxL) {
            maxL = len;
          }
        }
      }
    }

    out.push(n + m - 2 * maxL);
  }

  console.log(out.join('\n'));
};

solve();
