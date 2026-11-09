const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);

  const list = [];
  for (let i = 1; i <= 100000; i++) {
    const sq = (i * i).toString();
    let ok = true;
    for (let j = 0; j < sq.length; j++) {
      const c = sq.charCodeAt(j);
      if (c !== 48 && c !== 49 && c !== 52 && c !== 57) {
        ok = false;
        break;
      }
    }
    if (ok) list.push(i * i);
  }

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const a = Number(tokens[ptr++]);
    const b = Number(tokens[ptr++]);
    let cnt = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] >= a && list[i] <= b) {
        cnt++;
      }
    }
    out.push(cnt);
  }

  console.log(out.join('\n'));
}

solve();
