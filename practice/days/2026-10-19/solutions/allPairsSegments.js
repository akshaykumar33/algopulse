const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const q = parseInt(input[ptr++], 10);

    const x = [];
    for (let i = 0; i < n; i++) {
      x.push(BigInt(input[ptr++]));
    }

    const freq = new Map();

    const add = (k, count) => {
      const cur = freq.get(k) || 0n;
      freq.set(k, cur + count);
    };

    const bn = BigInt(n);

    for (let i = 1; i <= n; i++) {
      const bi = BigInt(i);
      const k = (bi - 1n) * (bn - bi) + (bn - 1n);
      add(k.toString(), 1n);
    }

    for (let i = 1; i < n; i++) {
      const bi = BigInt(i);
      const k = bi * (bn - bi);
      const gap = x[i] - x[i - 1] - 1n;
      if (gap > 0n) {
        add(k.toString(), gap);
      }
    }

    const ans = [];
    for (let i = 0; i < q; i++) {
      const qk = input[ptr++];
      const res = freq.get(qk) || 0n;
      ans.push(res.toString());
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
