const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);

  const pref = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    pref[i] = pref[i - 1] ^ i;
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans ^= parseInt(input[ptr++], 10);
  }

  for (let i = 1; i <= n; i++) {
    const full = Math.floor(n / i);
    const rem = n % i;
    if (full % 2 === 1) {
      ans ^= pref[i - 1];
    }
    ans ^= pref[rem];
  }

  console.log(ans);
}

solve();
