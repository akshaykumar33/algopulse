const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const tokT = nextInt();
  if (tokT === null) return;
  const t = tokT;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const set = new Set();
    for (let i = 0; i < n; i++) {
      set.add(nextInt());
    }

    if (set.size > k) {
      out.push('-1');
      continue;
    }

    const block = Array.from(set);
    let val = 1;
    while (block.length < k) {
      while (set.has(val)) val++;
      block.push(val);
      val++;
    }

    const res = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < k; j++) {
        res.push(block[j]);
      }
    }

    out.push(res.length.toString());
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

