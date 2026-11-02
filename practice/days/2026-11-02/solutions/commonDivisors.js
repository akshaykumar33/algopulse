const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 2 || tokens[0] === '') return;
  const s = tokens[0];
  const t = tokens[1];

  const n = s.length;
  const m = t.length;

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  const g = gcd(n, m);
  const base = s.slice(0, g);

  function check(str, pat) {
    const len = pat.length;
    if (str.length % len !== 0) return false;
    for (let i = 0; i < str.length; i += len) {
      if (str.slice(i, i + len) !== pat) return false;
    }
    return true;
  }

  if (!check(s, base) || !check(t, base)) {
    console.log(0);
    return;
  }

  let ans = 0;
  for (let i = 1; i <= g; i++) {
    if (g % i === 0) {
      const len = i;
      if (n % len === 0 && m % len === 0) {
        const pat = base.slice(0, len);
        if (check(base, pat)) {
          ans++;
        }
      }
    }
  }

  console.log(ans);
}

solve();
