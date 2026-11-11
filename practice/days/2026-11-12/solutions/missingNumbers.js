const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const v = [0, 0, 0, 0];

  for (let tc = 0; tc < t; tc++) {
    for (let i = 0; i < 4; i++) v[i] = parseInt(tokens[ptr++], 10);

    let ansA = -1;
    let ansB = -1;
    let found = false;

    for (let i = 0; i < 4 && !found; i++) {
      for (let j = 0; j < 4; j++) {
        if (i === j) continue;
        const s = v[i];
        const d = v[j];
        const sum = s + d;
        const diff = s - d;
        if (sum < 2 || diff < 2 || sum % 2 !== 0 || diff % 2 !== 0) continue;
        const a = sum / 2;
        const b = diff / 2;
        if (a < 1 || a > 10000 || b < 1 || b > 10000) continue;

        let r1 = -1;
        let r2 = -1;
        for (let k = 0; k < 4; k++) {
          if (k === i || k === j) continue;
          if (r1 === -1) r1 = k;
          else r2 = k;
        }
        const p = a * b;
        const q = Math.floor(a / b);
        if ((v[r1] === p && v[r2] === q) || (v[r1] === q && v[r2] === p)) {
          ansA = a;
          ansB = b;
          found = true;
          break;
        }
      }
    }

    out.push(found ? ansA + ' ' + ansB : '-1 -1');
  }

  console.log(out.join('\n'));
}

solve();
