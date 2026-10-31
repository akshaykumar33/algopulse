const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = BigInt(tokens[ptr++]);

    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(BigInt(tokens[ptr++]));
    }
    a.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));

    let remK = k;
    let ans = a[0];

    for (let i = 1; i < n; i++) {
      const diff = a[i] - a[i - 1];
      const count = BigInt(i);
      const needed = count * diff;

      if (remK < needed) {
        ans = a[i - 1] + remK / count;
        remK = 0n;
        break;
      }
      remK -= needed;
      ans = a[i];
    }

    if (remK > 0n) {
      ans += remK / BigInt(n);
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
