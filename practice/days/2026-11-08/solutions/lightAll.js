const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    let states = new Set([0]);
    for (let i = 0; i < n; i++) {
      const next = new Set();
      const si = s.charCodeAt(i) - 48;
      for (const st of states) {
        if (st === 1) {
          if (si === 1) {
            next.add(0);
          }
        } else if (st === 0) {
          if (si === 0) {
            next.add(1);
          } else {
            next.add(0);
            next.add(2);
          }
        } else if (st === 2) {
          if (si === 0) {
            next.add(0);
          } else {
            next.add(0);
            next.add(2);
          }
        }
      }
      states = next;
      if (states.size === 0) break;
    }

    if (states.has(0) || states.has(2)) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();
