const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      pos++;
    }
    return input.slice(start, pos);
  }

  const tokT = nextToken();
  if (!tokT) return;
  const t = parseInt(tokT, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(nextToken(), 10);
    }

    a.sort();

    let ans = 0n;
    let l = 0;

    for (let r = 0; r < n; r++) {
      while (a[r] - a[l] > 2) {
        l++;
      }
      const cnt = BigInt(r - l);
      if (cnt >= 2n) {
        ans += (cnt * (cnt - 1n)) / 2n;
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
