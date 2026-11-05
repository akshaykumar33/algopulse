const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);
    const d = parseInt(tokens[ptr++], 10);
    if (a === b) {
      out.push(c === d ? "YES" : "NO");
    } else {
      const diff = Math.abs(a - b);
      const cdiff = Math.abs(c - d);
      if (cdiff % diff === 0) {
        out.push("YES");
      } else {
        out.push("NO");
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
