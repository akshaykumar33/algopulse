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
    const m = nextInt();
    const k = nextInt();

    const count = new Int32Array(n + 1);
    for (let i = 0; i < k; i++) {
      const id = nextInt();
      if (id <= n) count[id]++;
    }

    const cheaters = [];
    for (let i = 1; i <= n; i++) {
      if (count[i] > 1) cheaters.push(i);
    }

    if (cheaters.length === 0) {
      out.push(0);
    } else {
      out.push(cheaters.length + ' ' + cheaters.join(' '));
    }
  }
  console.log(out.join('\n'));
}

solve();
