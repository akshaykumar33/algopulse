const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const k = parseInt(tokens[ptr++], 10);
    let s = "3";
    if (k > 0) {
      s += ".";
      let rem = 103993;
      let den = 33102;
      for (let j = 0; j < k; j++) {
        rem %= den;
        rem *= 10;
        s += Math.floor(rem / den);
        rem %= den;
      }
    }
    out.push(s);
  }
  console.log(out.join('\n'));
}

solve();
