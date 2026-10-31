const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const f = [];
    for (let i = 0; i < n; i++) {
      f.push(BigInt(tokens[ptr++]));
    }

    if (n === 2) {
      out.push(`${f[1].toString()} ${f[0].toString()}`);
      continue;
    }

    const nBig = BigInt(n);
    const S = (f[0] + f[n - 1]) / (nBig - 1n);

    const a = new Array(n);
    a[0] = (f[1] - f[0] + S) / 2n;
    a[n - 1] = (S - (f[n - 1] - f[n - 2])) / 2n;

    for (let i = 1; i < n - 1; i++) {
      a[i] = (f[i + 1] - 2n * f[i] + f[i - 1]) / 2n;
    }

    out.push(a.map(x => x.toString()).join(' '));
  }

  console.log(out.join('\n'));
}

solve();
