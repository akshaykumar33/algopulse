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
    const k = BigInt(nextToken());

    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(BigInt(nextToken()));
    }

    let low = 0n;
    let high = 2000000000000000n;
    let X = 0n;

    while (low <= high) {
      const mid = (low + high) / 2n;
      let req = 0n;
      for (let i = 0; i < n; i++) {
        if (a[i] < mid) {
          req += mid - a[i];
        }
      }
      if (req <= k) {
        X = mid;
        low = mid + 1n;
      } else {
        high = mid - 1n;
      }
    }

    let rem = k;
    for (let i = 0; i < n; i++) {
      if (a[i] < X) {
        rem -= (X - a[i]);
        a[i] = X;
      }
    }

    let cnt = 0n;
    for (let i = 0; i < n; i++) {
      if (a[i] > X) {
        cnt++;
      } else if (a[i] === X && rem > 0n) {
        rem--;
        cnt++;
      }
    }

    const ans = BigInt(n) * X - BigInt(n - 1) + cnt;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
