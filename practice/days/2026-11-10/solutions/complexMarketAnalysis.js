const fs = require('fs');

function solve() {
  const MAX = 1000000;
  const isPrime = new Uint8Array(MAX + 1);
  isPrime.fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;
  for (let i = 2; i * i <= MAX; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= MAX; j += i) {
        isPrime[j] = 0;
      }
    }
  }

  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const tokT = nextInt();
  if (tokT === null) return;
  const t = tokT;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const e = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
    }

    let ans = 0n;

    for (let r = 0; r < e; r++) {
      const chain = [];
      for (let i = r; i < n; i += e) {
        chain.push(a[i]);
      }

      const m = chain.length;
      const leftOnes = new Int32Array(m);
      for (let i = 0; i < m; i++) {
        if (chain[i] === 1) {
          leftOnes[i] = (i > 0 ? leftOnes[i - 1] : 0) + 1;
        } else {
          leftOnes[i] = 0;
        }
      }

      const rightOnes = new Int32Array(m);
      for (let i = m - 1; i >= 0; i--) {
        if (chain[i] === 1) {
          rightOnes[i] = (i + 1 < m ? rightOnes[i + 1] : 0) + 1;
        } else {
          rightOnes[i] = 0;
        }
      }

      for (let i = 0; i < m; i++) {
        if (isPrime[chain[i]]) {
          const l = i > 0 ? leftOnes[i - 1] : 0;
          const rgt = i + 1 < m ? rightOnes[i + 1] : 0;
          ans += BigInt(l + 1) * BigInt(rgt + 1) - 1n;
        }
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

