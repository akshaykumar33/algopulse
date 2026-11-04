const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const h = parseInt(input[ptr++], 10);
    const y1 = parseInt(input[ptr++], 10);
    const y2 = parseInt(input[ptr++], 10);
    let l = parseInt(input[ptr++], 10);

    let passed = 0;
    let stopped = false;

    for (let i = 0; i < n; i++) {
      const type = parseInt(input[ptr++], 10);
      const x = parseInt(input[ptr++], 10);

      if (stopped) continue;

      let canPass = false;
      if (type === 1) {
        if (h - y1 <= x) {
          canPass = true;
        }
      } else {
        if (y2 >= x) {
          canPass = true;
        }
      }

      if (canPass) {
        passed++;
      } else {
        l--;
        if (l === 0) {
          stopped = true;
        } else {
          passed++;
        }
      }
    }

    out.push(passed);
  }

  console.log(out.join('\n'));
}

solve();

