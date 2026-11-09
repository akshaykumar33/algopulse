const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);

    if (x === n || (x === n - 1 && n !== 1)) {
      out.push('-1');
      continue;
    }

    if (n === 1) {
      out.push('1');
      continue;
    }

    if (x === 0) {
      const res = [];
      for (let i = 1; i <= n; i++) res.push(i);
      out.push(res.join(' '));
      continue;
    }

    const res = [x + 2];
    for (let i = 1; i <= n; i++) {
      if (i !== x + 2) res.push(i);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
