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

    const groups = new Map();
    for (let i = 0; i < n; i++) {
      const val = nextInt();
      let list = groups.get(val);
      if (!list) {
        list = [];
        groups.set(val, list);
      }
      list.push(i);
    }

    const pool = [];
    for (const list of groups.values()) {
      const take = Math.min(list.length, k);
      for (let i = 0; i < take; i++) {
        pool.push(list[i]);
      }
    }

    const total = pool.length - (pool.length % k);
    const ans = new Int32Array(n);

    for (let i = 0; i < total; i++) {
      ans[pool[i]] = (i % k) + 1;
    }

    const res = [];
    for (let i = 0; i < n; i++) {
      res.push(ans[i]);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

