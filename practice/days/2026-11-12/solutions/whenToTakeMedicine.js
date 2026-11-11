const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const md = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const dim = (y, m) => {
    if (m === 2 && ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0)) return 29;
    return md[m];
  };

  for (let tc = 0; tc < t; tc++) {
    const parts = tokens[ptr++].split(':');
    let y = parseInt(parts[0], 10);
    let m = parseInt(parts[1], 10);
    let d = parseInt(parts[2], 10);
    const par = d & 1;
    let ans = 1;
    let need = true;

    while (true) {
      d++;
      if (d > dim(y, m)) {
        d = 1;
        m++;
        if (m > 12) {
          m = 1;
          y++;
        }
      }
      need = !need;
      const take = (d & 1) === par;
      if (take !== need) break;
      if (need) ans++;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
