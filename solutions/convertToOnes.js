const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const x = BigInt(tokens[ptr++]);
  const y = BigInt(tokens[ptr++]);
  const s = tokens[ptr++];

  let cnt = 0n;
  for (let i = 0; i < n; i++) {
    if (s[i] === '0' && (i === 0 || s[i - 1] === '1')) {
      cnt++;
    }
  }

  if (cnt === 0n) {
    console.log('0');
    return;
  }

  const cost1 = (cnt - 1n) * x + y;
  const cost2 = cnt * y;
  const ans = cost1 < cost2 ? cost1 : cost2;
  console.log(ans.toString());
}

solve();
