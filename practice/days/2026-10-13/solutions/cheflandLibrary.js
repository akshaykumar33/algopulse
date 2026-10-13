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
    const map = new Map();
    for (let i = 1; i <= n; i++) {
      const a = nextInt();
      map.set(a, i);
    }

    let sum = 0;
    for (const val of map.values()) {
      sum += val;
    }
    out.push(sum);
  }

  console.log(out.join('\n'));
}

solve();
