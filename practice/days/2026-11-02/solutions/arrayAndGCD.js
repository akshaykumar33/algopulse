const fs = require('fs');

const MAXP = 6000000;
const isPrime = new Uint8Array(MAXP);
isPrime.fill(1);
isPrime[0] = isPrime[1] = 0;
for (let p = 2; p * p < MAXP; p++) {
  if (isPrime[p]) {
    for (let q = p * p; q < MAXP; q += p) {
      isPrime[q] = 0;
    }
  }
}

const primePref = [0n];
for (let p = 2; p < MAXP; p++) {
  if (isPrime[p]) {
    primePref.push(primePref[primePref.length - 1] + BigInt(p));
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(BigInt(tokens[ptr++]));
    }

    a.sort((x, y) => (x > y ? -1 : x < y ? 1 : 0));

    let curSum = 0n;
    let ans = 0;
    for (let i = 0; i < n; i++) {
      curSum += a[i];
      if (curSum < primePref[i + 1]) {
        ans = n - i;
        break;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

