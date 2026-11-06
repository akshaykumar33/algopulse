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
    const k = nextInt();
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(nextInt());
    }

    let rem = BigInt(k + 1);
    let ans = 0n;

    for (let i = 0; i < n - 1; i++) {
      const diff = a[i + 1] - a[i];
      let limit = 1n;
      for (let j = 0; j < diff; j++) {
        limit *= 10n;
      }
      limit -= 1n;

      const take = rem < limit ? rem : limit;
      let p = 1n;
      for (let j = 0; j < a[i]; j++) {
        p *= 10n;
      }
      ans += take * p;
      rem -= take;
      if (rem === 0n) break;
    }

    if (rem > 0n) {
      let p = 1n;
      for (let j = 0; j < a[n - 1]; j++) {
        p *= 10n;
      }
      ans += rem * p;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

