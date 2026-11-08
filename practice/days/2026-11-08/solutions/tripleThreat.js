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

    const m = Math.min(n, Math.floor((3 * n - x) / 2));
    const c = new Array(n).fill(0);
    for (let i = m; i < n; i++) {
      c[i] = 2;
    }
    let rem = x - 2 * (n - m);
    for (let i = n - 1; i >= 0 && rem > 0; i--) {
      c[i]++;
      rem--;
    }

    const arr = new Array(3 * n).fill('0');
    for (let i = 0; i < n; i++) {
      if (c[i] === 1) {
        arr[i + 2 * n] = '1';
      } else if (c[i] === 2) {
        arr[i + n] = '1';
        arr[i + 2 * n] = '1';
      } else if (c[i] === 3) {
        arr[i] = '1';
        arr[i + n] = '1';
        arr[i + 2 * n] = '1';
      }
    }
    out.push(arr.join(''));
  }

  console.log(out.join('\n'));
}

solve();
