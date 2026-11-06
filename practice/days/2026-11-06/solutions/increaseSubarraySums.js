const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1;
    if (input.charCodeAt(pos) === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const x = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
    }

    const maxLen = new Int32Array(n + 1);
    maxLen.fill(-1e9);
    maxLen[0] = 0;

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = i; j < n; j++) {
        sum += a[j];
        const len = j - i + 1;
        if (sum > maxLen[len]) {
          maxLen[len] = sum;
        }
      }
    }

    const res = [];
    for (let k = 0; k <= n; k++) {
      let best = 0;
      for (let len = 0; len <= n; len++) {
        const cur = maxLen[len] + Math.min(k, len) * x;
        if (cur > best) {
          best = cur;
        }
      }
      res.push(best);
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

