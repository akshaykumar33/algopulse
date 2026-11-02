const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  const len = input.length;

  function nextToken() {
    while (pos < len && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= len) return null;
    const start = pos;
    while (pos < len && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const k = BigInt(nextToken());

    const S = new Array(n);
    const E = new Array(n);
    const dead = new Array(n);

    let lo = null;
    let cap = null;

    for (let i = 0; i < n; i++) {
      const a = BigInt(nextToken());
      const b = BigInt(nextToken());
      const c = BigInt(nextToken());
      const s = a + b + c;
      S[i] = s;
      const isDead = (a === b && b === c);
      dead[i] = isDead;
      let e = 0n;
      if (a <= b && b <= c) {
        const d1 = b - a;
        const d2 = c - b;
        e = (d1 < d2 ? d1 : d2) + 1n;
      }
      E[i] = e;

      if (lo === null || s < lo) lo = s;
      if (isDead) {
        if (cap === null || s < cap) cap = s;
      }
    }

    let hi = lo + k;
    if (cap !== null && cap < hi) hi = cap;
    hi += 1n;

    function isOk(m) {
      let total = 0n;
      for (let i = 0; i < n; i++) {
        if (S[i] >= m) continue;
        if (dead[i]) return false;
        total += (m - S[i]) + 2n * E[i];
        if (total > k) return false;
      }
      return true;
    }

    while (hi - lo > 1n) {
      const mid = (hi + lo) / 2n;
      if (isOk(mid)) lo = mid;
      else hi = mid;
    }

    out.push(lo.toString());
  }

  console.log(out.join('\n'));
}

solve();
