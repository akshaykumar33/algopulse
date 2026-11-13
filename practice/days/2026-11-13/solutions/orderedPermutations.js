const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let idx = 0;
  const t = parseInt(tokens[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[idx++], 10);
    let k = BigInt(tokens[idx++]);

    if (n - 1 < 60 && k > (1n << BigInt(n - 1))) {
      out.push('-1');
      continue;
    }

    const ans = new Int32Array(n);
    let l = 0;
    let r = n - 1;

    for (let i = 1; i < n; i++) {
      const rem = n - 1 - i;
      if (rem >= 60) {
        ans[l++] = i;
      } else {
        const cnt = 1n << BigInt(rem);
        if (k <= cnt) {
          ans[l++] = i;
        } else {
          ans[r--] = i;
          k -= cnt;
        }
      }
    }
    ans[l] = n;

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
