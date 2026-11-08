const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(input[ptr++], 10);
    const y = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);

    let t1 = x;
    let t2 = y;
    while (true) {
      if (t1 <= t2) {
        const s = t1 === t2 ? t2 : t2 - y;
        if (s > 0 && t1 - s <= d) {
          out.push(t1);
          break;
        }
        if (t1 === t2) {
          t1 += x;
          t2 += y;
        } else {
          t1 += x;
        }
      } else {
        const s = t1 - x;
        if (s > 0 && t2 - s <= d) {
          out.push(t2);
          break;
        }
        t2 += y;
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
