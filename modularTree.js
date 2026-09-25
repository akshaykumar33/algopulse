const fs = require('fs');
const buffer = fs.readFileSync(0);
let offset = 0;

function nextInt() {
  while (offset < buffer.length && buffer[offset] <= 32) offset++;
  if (offset >= buffer.length) return null;
  let res = 0;
  while (offset < buffer.length && buffer[offset] > 32) {
    res = res * 10 + (buffer[offset] - 48);
    offset++;
  }
  return res;
}

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

const MAXN = 200005;
const head = new Int32Array(MAXN);
const to = new Int32Array(2 * MAXN);
const nxt = new Int32Array(2 * MAXN);
const order = new Int32Array(MAXN);
const parent = new Int32Array(MAXN);
const aVal = new Int32Array(MAXN);
const bVal = new Int32Array(MAXN);
const step = new Int32Array(MAXN); // reachable values of u are a_u + k*step[u] (mod b_u)
const best = new Int32Array(MAXN);

const output = [];

function solve() {
  const T = nextInt();
  if (T === null) return;

  for (let t = 0; t < T; t++) {
    const n = nextInt();
    for (let i = 1; i <= n; i++) aVal[i] = nextInt();
    for (let i = 1; i <= n; i++) bVal[i] = nextInt();

    let edgeCount = 0;
    for (let i = 1; i <= n; i++) head[i] = -1;

    for (let i = 0; i < n - 1; i++) {
      const u = nextInt();
      const v = nextInt();
      to[edgeCount] = v;
      nxt[edgeCount] = head[u];
      head[u] = edgeCount++;
      to[edgeCount] = u;
      nxt[edgeCount] = head[v];
      head[v] = edgeCount++;
    }

    let headQ = 0, tailQ = 0;
    order[tailQ++] = 1;
    parent[1] = 0;

    while (headQ < tailQ) {
      const u = order[headQ++];
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = to[e];
        if (v !== parent[u]) {
          parent[v] = u;
          order[tailQ++] = v;
        }
      }
    }

    for (let i = n - 1; i >= 0; i--) {
      const u = order[i];
      const bu = bVal[u];

      // s ranges over sums of child values. Child c contributes a_c plus any
      // multiple of step[c], so gcd(b_u, sum a_c, {step[c]}) is the increment
      // group of x_u. A frozen child (step == b_c) offers no variation, so its
      // modulus must NOT enter the gcd -- that was the bug.
      let sBase = 0;
      let curG = bu;

      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = to[e];
        if (v !== parent[u]) {
          sBase += aVal[v];
          if (step[v] !== bVal[v]) curG = gcd(curG, step[v]);
        }
      }

      // A leaf falls out of this for free: sBase = 0, so curG = gcd(b_u, 0) = b_u.
      curG = gcd(curG, sBase);
      step[u] = curG;
      best[u] = bu - curG + (aVal[u] % curG);
    }

    let totalSum = 0;
    for (let i = 1; i <= n; i++) totalSum += best[i];

    output.push(totalSum);
  }

  process.stdout.write(output.join('\n') + '\n');
}

solve();
