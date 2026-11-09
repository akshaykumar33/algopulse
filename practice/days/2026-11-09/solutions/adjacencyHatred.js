const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const odds = [];
    const evens = [];

    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      if (v % 2 !== 0) {
        odds.push(v);
      } else {
        evens.push(v);
      }
    }

    if (odds.length === 0 || evens.length === 0) {
      out.push('-1');
    } else {
      out.push(odds.concat(evens).join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
