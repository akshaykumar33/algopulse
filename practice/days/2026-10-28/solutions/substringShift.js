const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    const firstZ = s.indexOf('z');
    if (firstZ === -1) {
      out.push(s);
      continue;
    }

    let endZ = firstZ;
    while (endZ < n && s[endZ] === 'z') {
      endZ++;
    }

    const res = s.slice(0, firstZ) + 'a'.repeat(endZ - firstZ) + s.slice(endZ);
    out.push(res);
  }

  console.log(out.join('\n'));
}

solve();

