const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);

  const x1 = BigInt(input[ptr++]);
  let prev = x1;
  let g = 0n;

  for (let i = 1; i < n; i++) {
    const cur = BigInt(input[ptr++]);
    const diff = cur - prev;
    g = gcd(g, diff);
    prev = cur;
  }

  let foundIdx = -1;
  for (let j = 1; j <= m; j++) {
    const p = BigInt(input[ptr++]);
    if (foundIdx === -1 && g % p === 0n) {
      foundIdx = j;
    }
  }

  if (foundIdx !== -1) {
    console.log('YES');
    console.log(`${x1} ${foundIdx}`);
  } else {
    console.log('NO');
  }
}

solve();
