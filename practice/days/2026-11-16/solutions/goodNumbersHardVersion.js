const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const q = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < q; tc++) {
    let n = BigInt(input[ptr++]);
    const d = [];
    let temp = n;
    while (temp > 0n) {
      d.push(Number(temp % 3n));
      temp /= 3n;
    }
    d.push(0);

    let pos2 = -1;
    for (let i = d.length - 1; i >= 0; i--) {
      if (d[i] === 2) {
        pos2 = i;
        break;
      }
    }

    if (pos2 !== -1) {
      let j = pos2;
      while (j < d.length && d[j] !== 0) {
        j++;
      }
      d[j] = 1;
      for (let i = 0; i < j; i++) d[i] = 0;
    }

    let ans = 0n;
    let p3 = 1n;
    for (let i = 0; i < d.length; i++) {
      if (d[i] === 1) ans += p3;
      p3 *= 3n;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
