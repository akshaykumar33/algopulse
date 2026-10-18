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
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
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
    const q = nextInt();
    if (n === null || q === null) break;

    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += nextInt();
    }

    for (let i = 0; i < q; i++) {
      const l = nextInt();
      const r = nextInt();
      if ((r - l) % 2 === 0) {
        sum++;
      }
    }

    out.push(sum);
  }

  console.log(out.join('\n'));
}

solve();
