const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const m = nextInt();
  if (m === null) return;
  const k = nextInt();
  const adj = new Map();
  function add(u, v) {
    if (!adj.has(u)) adj.set(u, new Set());
    adj.get(u).add(v);
  }
  for (let i = 0; i < m; i++) {
    const u = nextInt(), v = nextInt();
    add(u, v);
    add(v, u);
  }
  const users = Array.from(adj.keys()).sort((a, b) => a - b);
  const out = [];
  for (const u of users) {
    const friendsU = adj.get(u);
    const totalU = friendsU.size;
    const recs = [];
    for (const v of users) {
      if (u === v || friendsU.has(v)) continue;
      const friendsV = adj.get(v);
      let common = 0;
      for (const f of friendsU) {
        if (friendsV.has(f)) common++;
      }
      if (common * 100 >= k * totalU) {
        recs.push(v);
      }
    }
    recs.sort((a, b) => a - b);
    if (recs.length === 0) {
      out.push(u + ': 0');
    } else {
      out.push(u + ': ' + recs.length + ' ' + recs.join(' '));
    }
  }
  console.log(out.join('\n'));
}
solve();