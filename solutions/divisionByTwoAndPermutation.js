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
    for (let j = 0; j < n; j++) {
      a.push(parseInt(input[ptr++], 10));
    }

    a.sort((x, y) => y - x);
    const used = new Array(n + 1).fill(false);
    let ok = true;

    for (let j = 0; j < n; j++) {
      let x = a[j];
      while (x > n || (x > 0 && used[x])) {
        x = Math.floor(x / 2);
      }
      if (x === 0) {
        ok = false;
        break;
      }
      used[x] = true;
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
