const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
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
    const m = nextInt();

    const maxVal = Math.max(n + 1, 1);
    const freq = new Int32Array(maxVal + 1);

    for (let i = 0; i < m; i++) {
      const a = nextInt();
      if (a >= n) {
        freq[n]++;
      } else {
        freq[a]++;
      }
    }

    const cnt = new Int32Array(n + 2);
    for (let i = n; i >= 1; i--) {
      cnt[i] = cnt[i + 1] + freq[i];
    }

    let ans = 0n;
    for (let k = 1; k < n; k++) {
      const c1 = BigInt(cnt[k]);
      const c2 = BigInt(cnt[n - k]);
      const both = BigInt(cnt[Math.max(k, n - k)]);
      ans += c1 * c2 - both;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

