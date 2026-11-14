const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const map = new Map();
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      map.set(v, (map.get(v) || 0) + 1);
    }

    const freqs = Array.from(map.values()).sort((a, b) => a - b);
    const k = freqs.length;
    let maxKept = 0;

    for (let i = 0; i < k; i++) {
      const kept = freqs[i] * (k - i);
      if (kept > maxKept) maxKept = kept;
    }
    out.push(n - maxKept);
  }
  console.log(out.join('\n'));
}

solve();
