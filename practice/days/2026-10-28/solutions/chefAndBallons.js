const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const r = BigInt(tokens[ptr++]);
    const g = BigInt(tokens[ptr++]);
    const b = BigInt(tokens[ptr++]);
    const k = BigInt(tokens[ptr++]);

    const target = k - 1n;
    const minR = r < target ? r : target;
    const minG = g < target ? g : target;
    const minB = b < target ? b : target;

    const ans = minR + minG + minB + 1n;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

