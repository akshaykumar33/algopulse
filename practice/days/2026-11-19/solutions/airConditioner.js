const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const q = Number(input[ptr++]);
  const out = [];

  for (let query = 0; query < q; query++) {
    const n = Number(input[ptr++]);
    const m = Number(input[ptr++]);
    let curL = m;
    let curR = m;
    let prevT = 0;
    let ok = true;

    for (let i = 0; i < n; i++) {
      const t = Number(input[ptr++]);
      const l = Number(input[ptr++]);
      const h = Number(input[ptr++]);

      const dt = t - prevT;
      curL -= dt;
      curR += dt;
      prevT = t;

      curL = Math.max(curL, l);
      curR = Math.min(curR, h);

      if (curL > curR) {
        ok = false;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
