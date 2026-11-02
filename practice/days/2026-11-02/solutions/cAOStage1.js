const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const r = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);
    const grid = [];
    for (let i = 0; i < r; i++) {
      grid.push(tokens[ptr++]);
    }

    let ans = 0;
    for (let i = 2; i < r - 2; i++) {
      for (let j = 2; j < c - 2; j++) {
        if (grid[i][j] === '#') continue;
        let ok = true;
        for (let len = 1; len <= 2; len++) {
          if (
            grid[i - len][j] === '#' ||
            grid[i + len][j] === '#' ||
            grid[i][j - len] === '#' ||
            grid[i][j + len] === '#'
          ) {
            ok = false;
            break;
          }
        }
        if (ok) {
          let primeCount = 0;
          const limits = [
            i,
            r - 1 - i,
            j,
            c - 1 - j
          ];
          for (const m of limits) {
            let primes = 0;
            for (let p = 2; p <= m; p++) {
              let isPrime = true;
              for (let d = 2; d * d <= p; d++) {
                if (p % d === 0) {
                  isPrime = false;
                  break;
                }
              }
              if (isPrime) primes++;
            }
            if (primes >= 2) primeCount++;
          }
          if (primeCount >= 4) {
            ans++;
          }
        }
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
