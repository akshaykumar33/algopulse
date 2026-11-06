const { spawn } = require('child_process');
const R = k => Math.floor(Math.random() * k);
function gen() {
  const n = 4 + R(+process.env.NMAX || (Math.random() < 0.3 ? 2000 : 30));
  const k = 2 + R(Math.min(5, n / 2 - 1));
  const cid = Array.from({ length: n }, (_, i) => i < k ? i : i === k ? 0 : R(k));
  const perm = [...Array(n).keys()].map(x => x + 1).sort(() => Math.random() - 0.5);
  const col = {}, E = new Set(), edges = [];
  const add = (u, v) => { const key = Math.min(u, v) + ',' + Math.max(u, v); if (!E.has(key)) { E.add(key); edges.push([u, v]); } };
  const members = Array.from({ length: k }, () => []);
  cid.forEach((c, i) => members[c].push(perm[i]));
  for (const ms of members) {
    col[ms[0]] = 0;
    for (let i = 1; i < ms.length; i++) { const p = ms[R(i)]; col[ms[i]] = col[p] ^ 1; add(p, ms[i]); }
    for (let e = 0; e < ms.length; e++) { const a = ms[R(ms.length)], b = ms[R(ms.length)]; if (col[a] !== col[b]) add(a, b); }
  }
  const ca = members[0], cb = members[1];
  let x1, y1, x2, y2;
  do { x1 = ca[R(ca.length)]; y1 = cb[R(cb.length)]; x2 = ca[R(ca.length)]; y2 = cb[R(cb.length)]; }
  while ((col[x1] ^ col[x2] ^ col[y1] ^ col[y2]) !== 1 || (x1 === x2 && y1 === y2));
  return { n, edges, hid: [[x1, y1], [x2, y2]] };
}
function run(tests) {
  return new Promise((res, rej) => {
    const p = spawn('node', ['contests/codeforces/2026-11-06/myMindIsGoing.js']);
    let ti = 0, q = 0, out = '';
    let G;
    const send = s => p.stdin.write(s + '\n');
    const start = () => {
      if (ti === tests.length) { p.stdin.end(); return; }
      const T = tests[ti]; q = 0;
      G = new Map();
      const all = T.edges.concat(T.hid);
      for (let i = 1; i <= T.n; i++) G.set(i, []);
      for (const [u, v] of all) { G.get(u).push(v); G.get(v).push(u); }
      send(`${T.n} ${T.edges.length}\n` + T.edges.map(e => e.join(' ')).join('\n'));
    };
    send(String(tests.length));
    start();
    p.stdout.on('data', d => {
      out += d;
      let i;
      while ((i = out.indexOf('\n')) >= 0) {
        const line = out.slice(0, i).trim(); out = out.slice(i + 1);
        const a = line.split(' ');
        const T = tests[ti];
        if (a[0] === '!') {
          const u = +a[1], v = +a[2];
          if (!T.hid.some(([x, y]) => (x === u && y === v) || (x === v && y === u))) return rej(['wrong', T.hid, line]);
          ti++; start(); continue;
        }
        if (++q > 33) return rej(['too many', T.n]);
        if (a[1] === '2') { const u = +a[2], v = +a[3]; send(G.get(u).includes(v) ? '1' : '0'); continue; }
        const S = new Set(a.slice(3).map(Number)), c = new Map(); let ok = 1;
        for (const s of S) if (!c.has(s)) { c.set(s, 0); const st = [s]; while (st.length && ok) { const x = st.pop(); for (const y of G.get(x)) if (S.has(y)) { if (!c.has(y)) { c.set(y, c.get(x) ^ 1); st.push(y); } else if (c.get(y) === c.get(x)) ok = 0; } } }
        send(String(ok));
      }
    });
    p.on('close', () => ti === tests.length ? res() : rej('closed early'));
  });
}
(async () => {
  for (let r = 0; r < (+process.env.R || 40); r++) await run(Array.from({ length: +process.env.T || 20 }, gen));
  console.log('ok 800');
})().catch(e => { console.log('FAIL', JSON.stringify(e).slice(0, 300)); process.exit(1); });
