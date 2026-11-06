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
    const m = nextInt();

    let c1 = 0;
    let c2 = 0;
    const fixedSet = new Set();

    for (let i = 0; i < n; i++) {
      const x = nextInt();
      if (x === -1) {
        c1++;
      } else if (x === -2) {
        c2++;
      } else {
        fixedSet.add(x);
      }
    }

    const fixed = Array.from(fixedSet).sort((a, b) => a - b);
    const k = fixed.length;

    let ans = Math.max(Math.min(m, k + c1), Math.min(m, k + c2));

    for (let i = 0; i < k; i++) {
      const seat = fixed[i];
      const leftFixed = i;
      const rightFixed = k - 1 - i;

      const leftSeated = Math.min(seat - 1, leftFixed + c1);
      const rightSeated = Math.min(m - seat, rightFixed + c2);

      const total = 1 + leftSeated + rightSeated;
      if (total > ans) {
        ans = total;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

