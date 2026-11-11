const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    const a = tokens[ptr++];
    const b = tokens[ptr++];

    const diff = [];
    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) {
        diff.push(i);
      }
    }

    const k = diff.length;
    if (k & 1) {
      out.push(-1);
    } else if (k === 0) {
      out.push(0);
    } else if (k === 2 && diff[0] + 1 === diff[1]) {
      const alt = 2 * y;
      out.push(x < alt ? x : alt);
    } else {
      out.push((k / 2) * y);
    }
  }

  console.log(out.join('\n'));
}

solve();
