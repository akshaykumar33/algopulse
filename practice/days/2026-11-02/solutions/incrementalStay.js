const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const N = 2 * n;
    const v = [];
    for (let i = 0; i < N; i++) {
      v.push(BigInt(tokens[ptr++]));
    }

    const presums = [];
    const prede = [];
    let defaultsum = 0n;
    let presum = 0n;

    for (let i = 0; i < N; i++) {
      presum += v[i];
      if (i % 2 === 0) defaultsum -= v[i];
      else defaultsum += v[i];
      prede.push(defaultsum);
      presums.push(presum);
    }

    presum = 0n;
    const suffix = new Array(N).fill(0n);
    for (let i = N - 1; i >= 0; i--) {
      presum += v[i];
      suffix[i] = presum;
    }

    const res = [];
    for (let k = 1; k <= n; k++) {
      let ans = 0n;
      if (k % 2 === 1) {
        if (k !== 1) ans += prede[N - k] - prede[k - 2];
        else ans += prede[N - 1];
      } else {
        ans -= (prede[N - k] - prede[k - 2]);
      }
      if (k !== 1) ans -= presums[k - 2];
      if (k !== 1) ans += suffix[N - k + 1];
      res.push(ans.toString());
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

