const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const q = parseInt(tokens[ptr++], 10);

  const pref = new Array(n + 1);
  pref[0] = 0n;
  for (let i = 1; i <= n; i++) {
    pref[i] = pref[i - 1] + BigInt(tokens[ptr++]);
  }

  const totalStrength = pref[n];
  let curDamage = 0n;
  const out = [];

  for (let i = 0; i < q; i++) {
    const k = BigInt(tokens[ptr++]);
    curDamage += k;

    if (curDamage >= totalStrength) {
      curDamage = 0n;
      out.push(n);
      continue;
    }

    let l = 1, r = n;
    let dead = 0;
    while (l <= r) {
      const mid = (l + r) >> 1;
      if (pref[mid] <= curDamage) {
        dead = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    out.push(n - dead);
  }

  console.log(out.join('\n'));
}

solve();
