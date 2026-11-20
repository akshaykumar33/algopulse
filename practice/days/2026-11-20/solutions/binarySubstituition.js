const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const MOD = 998244353;
  const out = [];
  for (let t = 0; t < T; t++) {
    const s = input[ptr++];
    const n = s.length;
    let prev2 = 1, prev1 = 1;
    for (let i = 2; i <= n; i++) {
      let cur = prev1;
      if (s[i - 1] !== s[i - 2]) {
        cur = (cur + prev2) % MOD;
      }
      prev2 = prev1;
      prev1 = cur;
    }
    out.push(prev1);
  }
  console.log(out.join('\n'));
}
solve();