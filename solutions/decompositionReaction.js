const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const MOD = 1000000007n;
  const q = new Array(n + 1);
  for (let i = 1; i <= n; i++) q[i] = BigInt(input[ptr++]);

  for (let i = 0; i < m; i++) {
    const c0 = parseInt(input[ptr++], 10);
    const x = parseInt(input[ptr++], 10);
    const amt = q[c0];
    q[c0] = 0n;
    for (let j = 0; j < x; j++) {
      const w = BigInt(input[ptr++]);
      const c = parseInt(input[ptr++], 10);
      q[c] = (q[c] + w * amt) % MOD;
    }
  }

  const out = [];
  for (let i = 1; i <= n; i++) out.push(q[i].toString());
  console.log(out.join('\n'));
}
solve();