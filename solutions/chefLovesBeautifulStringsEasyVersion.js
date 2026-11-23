const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const s = input[ptr++];
    let b = 1n;
    for (let i = 1; i < s.length; i++) {
      if (s[i] !== s[i - 1]) b++;
    }
    let ans = 0n;
    if (b > 1n) {
      ans = (n - b) * (b - 1n) + (b - 1n) * (b - 2n) / 2n;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
