const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let x = 0;
    let y = 0;
    const path = [];
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === 'L') x--;
      else if (ch === 'R') x++;
      else if (ch === 'U') y++;
      else if (ch === 'D') y--;
      path.push([x, y]);
    }

    let found = false;
    for (let i = 0; i < path.length; i++) {
      const ox = path[i][0];
      const oy = path[i][1];
      if (ox === 0 && oy === 0) continue;

      let cx = 0;
      let cy = 0;
      for (let j = 0; j < s.length; j++) {
        const ch = s[j];
        let nx = cx;
        let ny = cy;
        if (ch === 'L') nx--;
        else if (ch === 'R') nx++;
        else if (ch === 'U') ny++;
        else if (ch === 'D') ny--;
        if (nx === ox && ny === oy) continue;
        cx = nx;
        cy = ny;
      }

      if (cx === 0 && cy === 0) {
        out.push(`${ox} ${oy}`);
        found = true;
        break;
      }
    }

    if (!found) {
      out.push('0 0');
    }
  }

  console.log(out.join('\n'));
}

solve();
