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

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = BigInt(nextToken());
    }
    const b = new Array(n);
    for (let i = 0; i < n; i++) {
      b[i] = BigInt(nextToken());
    }

    let maxx = 0n;
    let minn = 0n;

    for (let i = 0; i < n; i++) {
      const cand1 = maxx - a[i];
      const cand2 = b[i] - minn;
      const nextMax = cand1 > cand2 ? cand1 : cand2;

      const cand3 = minn - a[i];
      const cand4 = b[i] - maxx;
      const nextMin = cand3 < cand4 ? cand3 : cand4;

      maxx = nextMax;
      minn = nextMin;
    }

    out.push(maxx.toString());
  }

  console.log(out.join('\n'));
}

solve();
