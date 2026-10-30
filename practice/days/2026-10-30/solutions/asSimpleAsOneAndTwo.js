const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const len = s.length;
    const removed = [];
    let i = 0;

    while (i < len) {
      if (i + 4 < len && s.slice(i, i + 5) === 'twone') {
        removed.push(i + 3);
        i += 5;
      } else if (i + 2 < len && s.slice(i, i + 3) === 'two') {
        removed.push(i + 2);
        i += 3;
      } else if (i + 2 < len && s.slice(i, i + 3) === 'one') {
        removed.push(i + 2);
        i += 3;
      } else {
        i++;
      }
    }

    out.push(removed.length);
    out.push(removed.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
