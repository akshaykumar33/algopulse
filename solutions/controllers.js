const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const s = tokens[ptr++];
  const q = parseInt(tokens[ptr++], 10);

  let cp = 0n;
  let cm = 0n;
  for (let i = 0; i < n; i++) {
    if (s[i] === '+') cp++;
    else cm++;
  }

  const d = cp - cm;
  const out = [];

  for (let i = 0; i < q; i++) {
    const a = BigInt(tokens[ptr++]);
    const b = BigInt(tokens[ptr++]);

    if (a === b) {
      out.push(d === 0n ? 'YES' : 'NO');
    } else {
      const num = d * b;
      const den = b - a;
      if (num % den !== 0n) {
        out.push('NO');
      } else {
        const k = num / den;
        if (k >= -cm && k <= cp) {
          out.push('YES');
        } else {
          out.push('NO');
        }
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
