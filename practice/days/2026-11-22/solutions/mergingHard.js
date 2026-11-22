const fs = require('fs');

const MOD = 998244353;
const G = 3;

const MAXF = 200005;
const fact = new Int32Array(MAXF);
const invFact = new Int32Array(MAXF);

function power(base, exp) {
  let res = 1n;
  let b = BigInt(base);
  let e = BigInt(exp);
  const m = BigInt(MOD);
  while (e > 0n) {
    if (e & 1n) res = (res * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return Number(res);
}

function modInverse(n) {
  return power(n, MOD - 2);
}

fact[0] = 1;
invFact[0] = 1;
for (let i = 1; i < MAXF; i++) {
  fact[i] = Number((BigInt(fact[i - 1]) * BigInt(i)) % BigInt(MOD));
}
invFact[MAXF - 1] = modInverse(fact[MAXF - 1]);
for (let i = MAXF - 2; i >= 1; i--) {
  invFact[i] = Number((BigInt(invFact[i + 1]) * BigInt(i + 1)) % BigInt(MOD));
}

function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  const num = BigInt(fact[n]);
  const den = (BigInt(invFact[r]) * BigInt(invFact[n - r])) % BigInt(MOD);
  return Number((num * den) % BigInt(MOD));
}

const MAXN = 1 << 19;
const roots = new Int32Array(MAXN);
const invRoots = new Int32Array(MAXN);

const rootW = power(G, (MOD - 1) / MAXN);
const invRootW = modInverse(rootW);

roots[0] = 1;
invRoots[0] = 1;
for (let i = 1; i < MAXN; i++) {
  roots[i] = Number((BigInt(roots[i - 1]) * BigInt(rootW)) % BigInt(MOD));
  invRoots[i] = Number((BigInt(invRoots[i - 1]) * BigInt(invRootW)) % BigInt(MOD));
}

function mulMod(a, b) {
  const b_hi = (b >> 15);
  const b_lo = b & 32767;
  const p1 = (a * b_hi) % MOD;
  return (p1 * 32768 + a * b_lo) % MOD;
}

function nttFast(a, invert) {
  const n = a.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
  }

  const rTable = invert ? invRoots : roots;
  const step = MAXN / n;

  for (let len = 2; len <= n; len <<= 1) {
    const half = len >> 1;
    const rStep = step * (n / len);
    for (let i = 0; i < n; i += len) {
      let rIdx = 0;
      for (let j = 0; j < half; j++) {
        const u = a[i + j];
        const v = mulMod(a[i + j + half], rTable[rIdx]);
        a[i + j] = u + v >= MOD ? u + v - MOD : u + v;
        a[i + j + half] = u - v < 0 ? u - v + MOD : u - v;
        rIdx += rStep;
      }
    }
  }

  if (invert) {
    const nInv = modInverse(n);
    for (let i = 0; i < n; i++) {
      a[i] = mulMod(a[i], nInv);
    }
  }
}

function multiplyFast(p1, p2) {
  const deg1 = p1.length - 1;
  const deg2 = p2.length - 1;
  const finalDeg = deg1 + deg2;
  let sz = 1;
  while (sz <= finalDeg) sz <<= 1;
  const a = new Int32Array(sz);
  const b = new Int32Array(sz);
  for (let i = 0; i < p1.length; i++) a[i] = p1[i];
  for (let i = 0; i < p2.length; i++) b[i] = p2[i];
  nttFast(a, false);
  nttFast(b, false);
  for (let i = 0; i < sz; i++) {
    a[i] = mulMod(a[i], b[i]);
  }
  nttFast(a, true);
  return a.slice(0, finalDeg + 1);
}

class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(poly) {
    this.heap.push(poly);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[p].length > this.heap[i].length) {
        const tmp = this.heap[p];
        this.heap[p] = this.heap[i];
        this.heap[i] = tmp;
        i = p;
      } else {
        break;
      }
    }
  }
  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    const n = this.heap.length;
    while (true) {
      let l = (i << 1) + 1;
      let r = l + 1;
      let sm = i;
      if (l < n && this.heap[l].length < this.heap[sm].length) sm = l;
      if (r < n && this.heap[r].length < this.heap[sm].length) sm = r;
      if (sm !== i) {
        const tmp = this.heap[i];
        this.heap[i] = this.heap[sm];
        this.heap[sm] = tmp;
        i = sm;
      } else {
        break;
      }
    }
    return top;
  }
  size() {
    return this.heap.length;
  }
}

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
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = nextInt();
    const p = new Int32Array(n);
    for (let i = 0; i < n; i++) p[i] = nextInt();
    const counts = new Map();
    let curMax = -1, curSize = 0;
    for (let i = 0; i < n; i++) {
      if (p[i] > curMax) {
        if (curSize > 0) counts.set(curSize, (counts.get(curSize) || 0) + 1);
        curMax = p[i];
        curSize = 1;
      } else {
        curSize++;
      }
    }
    if (curSize > 0) counts.set(curSize, (counts.get(curSize) || 0) + 1);
    const heap = new MinHeap();
    for (const [sz, c] of counts.entries()) {
      const poly = new Int32Array(sz * c + 1);
      for (let j = 0; j <= c; j++) {
        poly[j * sz] = nCr(c, j);
      }
      heap.push(poly);
    }
    while (heap.size() > 1) {
      const p1 = heap.pop();
      const p2 = heap.pop();
      heap.push(multiplyFast(p1, p2));
    }
    const finalPoly = heap.pop();
    const res = new Int32Array(n + 1);
    for (let i = 0; i < finalPoly.length; i++) res[i] = finalPoly[i];
    out.push(Array.from(res).join(' '));
  }
  console.log(out.join('\n'));
}
solve();
