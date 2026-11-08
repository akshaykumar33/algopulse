const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);

    const bAB = 31 - Math.clz32(a ^ b);
    const bBC = 31 - Math.clz32(b ^ c);

    if (bAB === bBC) {
      out.push(-1);
    } else {
      let x = 0;
      if ((a >> bAB) & 1) {
        x |= (1 << bAB);
      }
      if ((b >> bBC) & 1) {
        x |= (1 << bBC);
      }
      out.push(x);
    }
  }

  console.log(out.join('\n'));
}

solve();
