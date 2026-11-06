const data = require('fs').readFileSync(0, 'utf-8');
let pos = 0;
const next = () => {
  while (data.charCodeAt(pos) <= 32) pos++;
  let s = pos;
  while (pos < data.length && data.charCodeAt(pos) > 32) pos++;
  return data.slice(s, pos);
};
const MOD = 1000000007;
const md = x => {
  const r = x - Math.floor(x / MOD) * MOD;
  return r < 0 ? r + MOD : r;
};
const mul = (a, b) => md(md(a * (b >>> 16)) * 65536 + a * (b & 65535));
const MAXN = 500001;
const ip2 = new Int32Array(MAXN + 1);
const inv2 = (MOD + 1) / 2;
ip2[0] = 1;
for (let i = 1; i <= MAXN; i++) ip2[i] = mul(ip2[i - 1], inv2);
const t = +next();
const output = [];
for (let tc = 0; tc < t; tc++) {
  const n = +next();
  const s = next();
  if (n === 1) {
    output.push(0);
    continue;
  }
  let sz = 1;
  while (sz < n) sz <<= 1;
  const P = new Int32Array(2 * sz).fill(1);
  const S = new Int32Array(2 * sz);
  const cnt = new Int32Array(n), hit = new Uint8Array(n);
  const prv = new Int32Array(n), nxt = new Int32Array(n);
  let free = 0;
  const val = i => (hit[i] ? 1 : (1 - ip2[cnt[i]] + MOD) % MOD);
  for (let i = 0; i < n; i++) {
    hit[i] = s[i] === '1' ? 1 : 0;
    cnt[i] = 1 - hit[i];
    free += cnt[i];
    prv[i] = (i + n - 1) % n;
    nxt[i] = (i + 1) % n;
    P[sz + i] = S[sz + i] = val(i);
  }
  for (let i = sz - 1; i >= 1; i--) {
    P[i] = mul(P[2 * i], P[2 * i + 1]);
    S[i] = (S[2 * i] + mul(P[2 * i], S[2 * i + 1])) % MOD;
  }
  const upd = (i, p, sv) => {
    i += sz;
    P[i] = p;
    S[i] = sv;
    for (i >>= 1; i >= 1; i >>= 1) {
      P[i] = mul(P[2 * i], P[2 * i + 1]);
      S[i] = (S[2 * i] + mul(P[2 * i], S[2 * i + 1])) % MOD;
    }
  };
  const query = (l, r) => {
    let lp = 1, ls = 0, rp = 1, rs = 0;
    for (l += sz, r += sz + 1; l < r; l >>= 1, r >>= 1) {
      if (l & 1) {
        ls = (ls + mul(lp, S[l])) % MOD;
        lp = mul(lp, P[l]);
        l++;
      }
      if (r & 1) {
        r--;
        rs = (S[r] + mul(P[r], rs)) % MOD;
        rp = mul(P[r], rp);
      }
    }
    return [mul(lp, rp), (ls + mul(lp, rs)) % MOD];
  };
  let pw = 1;
  for (let i = 0; i < free; i++) pw = pw * 2 % MOD;
  let ans = 0;
  let cur = 0;
  for (let step = 1; step < n; step++) {
    const p = prv[cur];
    cnt[p] += cnt[cur];
    hit[p] |= hit[cur];
    nxt[p] = nxt[cur];
    prv[nxt[cur]] = p;
    upd(cur, 1, 0);
    const v = val(p);
    upd(p, v, v);
    cur = prv[p];
    const [p1, s1] = query(cur, n - 1);
    let tot = s1;
    if (cur > 0) {
      const [, s2] = query(0, cur - 1);
      tot = (s1 + mul(p1, s2)) % MOD;
    }
    ans = (ans + tot) % MOD;
  }
  output.push(mul(ans, pw));
}
console.log(output.join('\n'));
