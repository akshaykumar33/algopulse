const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const sets = Array.from({ length: n + 1 }, () => []);
    for (let i = 1; i <= n; i++) {
      sets[i].push(i);
    }

    for (let i = 1; i <= n; i++) {
      const row = tokens[ptr++];
      for (let j = 1; j <= n; j++) {
        if (row.charCodeAt(j - 1) === 49) {
          sets[j].push(i);
        }
      }
    }

    for (let i = 1; i <= n; i++) {
      out.push(sets[i].length + ' ' + sets[i].join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
