const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    if (n === 6) {
      out.push(7);
      out.push('1 2 4 6 5 3');
      continue;
    }

    const used = new Uint8Array(n + 1);
    const p = [];

    if (n % 2 === 1) {
      out.push(n);
      const tail = [1, 3, n - 1, n];
      for (let i = 0; i < 4; i++) used[tail[i]] = 1;
      for (let i = 1; i <= n; i++) {
        if (!used[i]) p.push(i);
      }
      for (let i = 0; i < 4; i++) p.push(tail[i]);
    } else {
      let b = 1;
      while ((b << 1) <= n) b <<= 1;
      out.push((b << 1) - 1);

      if ((n & (n - 1)) === 0) {
        const tail = [1, 3, n - 2, n - 1];
        for (let i = 0; i < 4; i++) used[tail[i]] = 1;
        used[n] = 1;
        for (let i = 1; i <= n; i++) {
          if (!used[i]) p.push(i);
        }
        for (let i = 0; i < 4; i++) p.push(tail[i]);
        p.push(n);
      } else {
        const tail = [b, n, b + 1, b - 1];
        for (let i = 0; i < 4; i++) used[tail[i]] = 1;
        for (let i = 1; i <= n; i++) {
          if (!used[i]) p.push(i);
        }
        for (let i = 0; i < 4; i++) p.push(tail[i]);
      }
    }

    out.push(p.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
