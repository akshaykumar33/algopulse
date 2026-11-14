const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const q = parseInt(input[ptr++], 10);
  const out = [];

  for (let qi = 0; qi < q; qi++) {
    let n = BigInt(input[ptr++]);
    let m = BigInt(input[ptr++]);
    const k = BigInt(input[ptr++]);

    if (n > m) {
      const tmp = n;
      n = m;
      m = tmp;
    }

    if (k < m) {
      out.push('-1');
      continue;
    }

    const diff = m - n;
    const rem = k - m;

    if (diff % 2n === 1n) {
      out.push((k - 1n).toString());
    } else {
      if (rem % 2n === 0n) {
        out.push(k.toString());
      } else {
        out.push((k - 2n).toString());
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
