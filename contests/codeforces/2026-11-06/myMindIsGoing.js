const fs = require('fs');
const rb = Buffer.alloc(1 << 16);
let len = 0, ptr = 0;
const byte = () => {
  if (ptr === len) {
    len = 0;
    while (len === 0) {
      try {
        len = fs.readSync(0, rb, 0, rb.length, null);
      } catch (e) {
        if (e.code === 'EAGAIN') continue;
        if (e.code === 'EOF') process.exit(0);
        throw e;
      }
      if (len === 0) process.exit(0);
    }
    ptr = 0;
  }
  return rb[ptr++];
};
const nextInt = () => {
  let c = byte();
  while (c <= 32) c = byte();
  if (c === 45) process.exit(0);
  let x = 0;
  while (c > 32) {
    x = x * 10 + c - 48;
    c = byte();
  }
  return x;
};
const out = s => fs.writeSync(1, s + '\n');
const ask = s => {
  out(s);
  return nextInt();
};
const bip = set => ask(`? 1 ${set.length} ${set.join(' ')}`);

const t = nextInt();
for (let tc = 0; tc < t; tc++) {
  const n = nextInt(), m = nextInt();
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < m; i++) {
    const u = nextInt(), v = nextInt();
    adj[u].push(v);
    adj[v].push(u);
  }
  const comp = new Int32Array(n + 1).fill(-1);
  const ord = [];
  let cc = 0;
  for (let s = 1; s <= n; s++) {
    if (comp[s] !== -1) continue;
    comp[s] = cc;
    const st = ord.length;
    ord.push(s);
    for (let h = st; h < ord.length; h++) {
      for (const v of adj[ord[h]]) if (comp[v] === -1) {
        comp[v] = cc;
        ord.push(v);
      }
    }
    cc++;
  }
  let lo = 1, hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (bip(ord.slice(0, mid)) === 0) hi = mid;
    else lo = mid + 1;
  }
  const w = ord[lo - 1];
  let start = lo - 1;
  while (start > 0 && comp[ord[start - 1]] === comp[w]) start--;
  const B = ord.slice(start, lo);
  const L = ord.slice(0, start);
  let l2 = 1, h2 = L.length;
  while (l2 < h2) {
    const mid = (l2 + h2) >> 1;
    if (bip(B.concat(L.slice(0, mid))) === 0) h2 = mid;
    else l2 = mid + 1;
  }
  const u = L[l2 - 1];
  if (ask(`? 2 ${u} ${w}`) === 1) {
    out(`! ${u} ${w}`);
    continue;
  }
  const inB = new Uint8Array(n + 1);
  for (const v of B) inB[v] = 1;
  const ord2 = [w];
  const vis = new Uint8Array(n + 1);
  vis[w] = 1;
  for (let h = 0; h < ord2.length; h++) {
    for (const v of adj[ord2[h]]) if (inB[v] && !vis[v]) {
      vis[v] = 1;
      ord2.push(v);
    }
  }
  const A = L.slice(0, l2);
  let l3 = 2, h3 = ord2.length;
  while (l3 < h3) {
    const mid = (l3 + h3) >> 1;
    if (bip(A.concat(ord2.slice(0, mid))) === 0) h3 = mid;
    else l3 = mid + 1;
  }
  out(`! ${u} ${ord2[l3 - 1]}`);
}
