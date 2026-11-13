const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let idx = 0;
  const t = parseInt(tokens[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const p = BigInt(tokens[idx++]);
    const q = BigInt(tokens[idx++]);

    if (p % q !== 0n) {
      out.push(p.toString());
      continue;
    }

    let tempQ = q;
    const primes = [];
    for (let d = 2n; d * d <= tempQ; d++) {
      if (tempQ % d === 0n) {
        primes.push(d);
        while (tempQ % d === 0n) {
          tempQ /= d;
        }
      }
    }
    if (tempQ > 1n) {
      primes.push(tempQ);
    }

    let ans = 1n;
    for (let i = 0; i < primes.length; i++) {
      const r = primes[i];
      let cur = p;
      while (cur % q === 0n) {
        cur /= r;
      }
      if (cur > ans) {
        ans = cur;
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
