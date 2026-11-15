const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 5) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const p = BigInt(input[ptr++]);
  const q = BigInt(input[ptr++]);
  const r = BigInt(input[ptr++]);

  let dp1 = -4000000000000000000n;
  let dp2 = -4000000000000000000n;
  let dp3 = -4000000000000000000n;

  for (let i = 0; i < n; i++) {
    const a = BigInt(input[ptr++]);
    const cur1 = p * a;
    if (cur1 > dp1) dp1 = cur1;

    const cur2 = dp1 + q * a;
    if (cur2 > dp2) dp2 = cur2;

    const cur3 = dp2 + r * a;
    if (cur3 > dp3) dp3 = cur3;
  }

  console.log(dp3.toString());
}

solve();
