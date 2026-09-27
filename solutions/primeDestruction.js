const data = require('fs').readFileSync(0);
let pos = 0;

function nextInt() {
  while (data[pos] < 48) pos++;
  let num = 0;
  while (pos < data.length && data[pos] >= 48) {
    num = num * 10 + (data[pos] - 48);
    pos++;
  }
  return num;
}

const MAXN = 200001;

// Smallest prime factor sieve
const spf = new Int32Array(MAXN);
for (let i = 2; i < MAXN; i++) {
  if (spf[i] === 0) {
    for (let j = i; j < MAXN; j += i) {
      if (spf[j] === 0) spf[j] = i;
    }
  }
}

// cost[x] = min ops to reduce a single x until every piece is <= k
const cost = new Int32Array(MAXN);

function solve() {
  const T = nextInt();
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = nextInt();
    const k = nextInt();

    for (let x = 2; x <= n; x++) {
      if (x <= k) {
        cost[x] = 0;
        continue;
      }
      let best = Infinity;
      let v = x;
      while (v > 1) {
        const p = spf[v];
        const c = 1 + p * cost[x / p];
        if (c < best) best = c;
        while (v % p === 0) v /= p;
      }
      cost[x] = best;
    }

    let total = 0;
    for (let i = 0; i < n; i++) {
      total += cost[nextInt()];
    }
    out.push(total);
  }

  process.stdout.write(out.join('\n') + '\n');
}

solve();
