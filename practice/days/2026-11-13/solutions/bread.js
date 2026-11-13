const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const k = BigInt(input[ptr++]);
    let rem = 0n;
    let ans = 0n;

    for (let i = 0; i < n; i++) {
      const a = BigInt(input[ptr++]);
      if (a <= rem) {
        rem -= a;
      } else {
        const needed = a - rem;
        const packages = (needed + k - 1n) / k;
        ans += packages;
        rem = packages * k - needed;
      }
      if (rem > 0n) {
        rem -= 1n;
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
