const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const k = parseInt(input[idx++], 10);
    const s = input[idx++];

    const ans = new Int32Array(n);
    let rem = k;
    const kParity = k & 1;

    for (let i = 0; i < n - 1; i++) {
      const bit = s.charCodeAt(i) - 48;
      if (rem > 0 && (bit ^ kParity) === 0) {
        ans[i] = 1;
        rem--;
      }
    }
    ans[n - 1] += rem;

    let res = '';
    for (let i = 0; i < n; i++) {
      const bit = s.charCodeAt(i) - 48;
      const flips = (k - ans[i]) & 1;
      res += (bit ^ flips);
    }

    out.push(res);
    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
