const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  function gcd(a, b) {
    while (b) {
      const tmp = b;
      b = a % b;
      a = tmp;
    }
    return a;
  }

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const q = parseInt(tokens[ptr++], 10);
    const L = (a * b) / gcd(a, b);
    const M = Math.max(a, b);
    const pref = new Int32Array(L);
    for (let i = 1; i < L; i++) {
      pref[i] = pref[i - 1] + (i >= M ? 1 : 0);
    }
    const countL = pref[L - 1];

    function count(n) {
      if (n <= 0) return 0n;
      const full = BigInt(Math.floor(Number(n) / L));
      const rem = Number(n % BigInt(L));
      return full * BigInt(countL) + BigInt(pref[rem]);
    }

    const qAns = [];
    for (let i = 0; i < q; i++) {
      const l = BigInt(tokens[ptr++]);
      const r = BigInt(tokens[ptr++]);
      qAns.push((count(r) - count(l - 1n)).toString());
    }
    out.push(qAns.join(' '));
  }
  console.log(out.join('\n'));
}
