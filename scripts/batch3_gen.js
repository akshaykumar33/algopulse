const fs = require('fs');
const path = require('path');

const batch3 = [
  {
    file: 'perfectPair',
    code: `const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1n;
    if (buf[pos] === 45) {
      sign = -1n;
      pos++;
    }
    let res = 0n;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  let x = nextBigInt();
  if (x === null) return;
  let y = nextBigInt();
  let m = nextBigInt();
  if (x >= m || y >= m) {
    console.log(0);
    return;
  }
  if (x <= 0n && y <= 0n) {
    console.log(-1);
    return;
  }
  if (x > y) {
    const t = x;
    x = y;
    y = t;
  }
  let ans = 0n;
  if (x < 0n) {
    const step = (-x + y - 1n) / y;
    x += step * y;
    ans += step;
  }
  while (x < m && y < m) {
    if (x > y) {
      const t = x;
      x = y;
      y = t;
    }
    x = x + y;
    ans++;
  }
  console.log(ans.toString());
}

solve();
`,
    tests: [
      {
        input: '2 3 7\n',
        output: '2\n'
      },
      {
        input: '-1 -4 7\n',
        output: '-1\n'
      },
      {
        input: '0 1 4\n',
        output: '4\n'
      }
    ]
  },
  {
    file: 'newReform',
    code: `const fs = require('fs');

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
  const n = nextInt();
  if (n === null) return;
  const m = nextInt();
  const parent = new Int32Array(n + 1);
  const vCount = new Int32Array(n + 1);
  const eCount = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    parent[i] = i;
    vCount[i] = 1;
  }
  function find(i) {
    let root = i;
    while (root !== parent[root]) root = parent[root];
    let curr = i;
    while (curr !== root) {
      const nxt = parent[curr];
      parent[curr] = root;
      curr = nxt;
    }
    return root;
  }
  for (let i = 0; i < m; i++) {
    const u = nextInt();
    const v = nextInt();
    const ru = find(u);
    const rv = find(v);
    if (ru !== rv) {
      parent[ru] = rv;
      vCount[rv] += vCount[ru];
      eCount[rv] += eCount[ru] + 1;
    } else {
      eCount[ru]++;
    }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (parent[i] === i) {
      if (eCount[i] === vCount[i] - 1) {
        ans++;
      }
    }
  }
  console.log(ans);
}

solve();
`,
    tests: [
      {
        input: '4 3\n2 1\n1 3\n4 3\n',
        output: '1\n'
      },
      {
        input: '5 5\n2 1\n1 3\n2 3\n2 5\n4 3\n',
        output: '0\n'
      },
      {
        input: '6 5\n1 2\n2 3\n4 5\n4 6\n5 6\n',
        output: '1\n'
      }
    ]
  },
  {
    file: 'kolyaAndMovieTheatre',
    code: `const fs = require('fs');

class MinHeap {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
    this._up(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._down(0);
    }
    return top;
  }
  size() {
    return this.data.length;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i] < this.data[p]) {
        const t = this.data[i];
        this.data[i] = this.data[p];
        this.data[p] = t;
        i = p;
      } else {
        break;
      }
    }
  }
  _down(i) {
    const len = this.data.length;
    while ((i << 1) + 1 < len) {
      let left = (i << 1) + 1;
      let right = left + 1;
      let best = left;
      if (right < len && this.data[right] < this.data[left]) best = right;
      if (this.data[best] < this.data[i]) {
        const t = this.data[i];
        this.data[i] = this.data[best];
        this.data[best] = t;
        i = best;
      } else {
        break;
      }
    }
  }
}

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    const d = nextInt();
    const heap = new MinHeap();
    let sum = 0;
    let ans = 0;
    for (let i = 1; i <= n; i++) {
      const a = nextInt();
      if (a > 0) {
        heap.push(a);
        sum += a;
        if (heap.size() > m) {
          sum -= heap.pop();
        }
        const cand = sum - d * i;
        if (cand > ans) ans = cand;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '6\n5 2 2\n2 3 2 5 4\n6 4 3\n2 1 1 1 1 1\n6 6 6\n-82 45 1 -77 39 11\n5 2 2\n3 2 5 4 8\n2 1 1\n-1 2\n6 3 2\n-8 8 -2 -1 9 0\n',
        output: '2\n0\n60\n3\n0\n7\n'
      }
    ]
  },
  {
    file: 'findMaximum',
    code: `const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextToken() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('utf8', start, pos);
  }
  const nStr = nextToken();
  if (!nStr) return;
  const n = parseInt(nStr, 10);
  const a = new Int32Array(n);
  const pref = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(nextToken(), 10);
    pref[i + 1] = pref[i] + a[i];
  }
  const s = nextToken();
  let suffSum = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === '1') suffSum += a[i];
  }
  let ans = suffSum;
  let curSuff = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === '1') {
      const cand = curSuff + pref[i];
      if (cand > ans) ans = cand;
      curSuff += a[i];
    }
  }
  console.log(ans);
}

solve();
`,
    tests: [
      {
        input: '5\n17 0 10 2 1\n11010\n',
        output: '29\n'
      }
    ]
  },
  {
    file: 'sequenceAndSwaps',
    code: `const fs = require('fs');

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
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];
  function isSorted(arr, n) {
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  }
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let x = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    if (isSorted(a, n)) {
      out.push(0);
      continue;
    }
    let ops = 0;
    let ok = false;
    for (let step = 0; step < n; step++) {
      let idx = -1;
      for (let i = 0; i < n; i++) {
        if (a[i] > x) {
          idx = i;
          break;
        }
      }
      if (idx === -1) break;
      const tmp = a[idx];
      a[idx] = x;
      x = tmp;
      ops++;
      if (isSorted(a, n)) {
        ok = true;
        break;
      }
    }
    if (ok) out.push(ops);
    else out.push(-1);
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '6\n5 1\n0 2 3 5 4\n4 2\n2 2 8 9\n3 3\n5 2 9\n4 1\n1 2 3 4\n1 5\n5\n5 5\n1 2 3 4 5\n',
        output: '3\n-1\n1\n0\n0\n0\n'
      }
    ]
  },
  {
    file: 'thePhoneNumber',
    code: `const fs = require('fs');

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
  const n = nextInt();
  if (n === null) return;
  let b = Math.floor(Math.sqrt(n));
  if (b < 1) b = 1;
  const ans = [];
  for (let i = n; i > 0; i -= b) {
    const start = Math.max(1, i - b + 1);
    for (let j = start; j <= i; j++) {
      ans.push(j);
    }
  }
  console.log(ans.join(' '));
}

solve();
`,
    tests: [
      {
        input: '4\n',
        output: '3 4 1 2\n'
      },
      {
        input: '2\n',
        output: '2 1\n'
      }
    ]
  },
  {
    file: 'kevinAndPuzzle',
    code: `const fs = require('fs');

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
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const MOD = 998244353;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const arr = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) arr[i] = nextInt();
    const dp0 = new Int32Array(n + 1);
    const dp1 = new Int32Array(n + 1);
    dp0[0] = 1;
    for (let i = 1; i <= n; i++) {
      dp1[i] = dp0[i - 1];
      let sum0 = 0;
      if (arr[i] === arr[i - 1]) {
        sum0 = (sum0 + dp0[i - 1]) % MOD;
      }
      if (i >= 2 && arr[i] === arr[i - 2] + 1) {
        sum0 = (sum0 + dp1[i - 1]) % MOD;
      }
      dp0[i] = sum0;
    }
    const ans = (dp0[n] + dp1[n]) % MOD;
    out.push(ans);
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '2\n1\n0\n2\n0 0\n',
        output: '2\n2\n'
      }
    ]
  },
  {
    file: 'jotyAndChocolate',
    code: `const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const n = nextBigInt();
  if (n === null) return;
  const a = nextBigInt();
  const b = nextBigInt();
  const p = nextBigInt();
  const q = nextBigInt();
  const g = gcd(a, b);
  const lcm = (a / g) * b;
  const ca = n / a;
  const cb = n / b;
  const cab = n / lcm;
  const onlyA = ca - cab;
  const onlyB = cb - cab;
  const maxP = p > q ? p : q;
  const ans = onlyA * p + onlyB * q + cab * maxP;
  console.log(ans.toString());
}

solve();
`,
    tests: [
      {
        input: '5 2 3 12 15\n',
        output: '39\n'
      },
      {
        input: '20 2 3 3 5\n',
        output: '51\n'
      }
    ]
  },
  {
    file: 'moderateModularMode',
    code: `const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const tVal = nextBigInt();
  if (tVal === null) return;
  const t = Number(tVal);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const x = nextBigInt();
    const y = nextBigInt();
    let n = 0n;
    if (x === y) {
      n = x;
    } else if (x > y) {
      n = x + y;
    } else {
      const r = y % x;
      n = y - r / 2n;
    }
    out.push(n.toString());
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '4\n4 2\n2 4\n6 6\n10 42\n',
        output: '6\n4\n6\n26\n'
      }
    ]
  },
  {
    file: 'cuttingOut',
    code: `const fs = require('fs');

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
  const n = nextInt();
  if (n === null) return;
  const k = nextInt();
  const freq = new Map();
  for (let i = 0; i < n; i++) {
    const v = nextInt();
    freq.set(v, (freq.get(v) || 0) + 1);
  }
  const entries = Array.from(freq.entries());
  let low = 1;
  let high = n;
  let bestC = 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    let cnt = 0;
    for (let i = 0; i < entries.length; i++) {
      cnt += Math.floor(entries[i][1] / mid);
      if (cnt >= k) break;
    }
    if (cnt >= k) {
      bestC = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  const ans = [];
  for (let i = 0; i < entries.length; i++) {
    const take = Math.floor(entries[i][1] / bestC);
    for (let j = 0; j < take && ans.length < k; j++) {
      ans.push(entries[i][0]);
    }
    if (ans.length >= k) break;
  }
  console.log(ans.join(' '));
}

solve();
`,
    tests: [
      {
        input: '7 3\n1 2 3 2 4 3 1\n',
        output: '1 2 3\n'
      },
      {
        input: '15 2\n1 2 1 1 1 2 1 1 2 1 2 1 1 1 1\n',
        output: '1 1\n'
      }
    ]
  },
  {
    file: 'dariusWisdom',
    code: `const fs = require('fs');

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
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n + 1);
    const pos0 = [];
    const pos1 = [];
    const pos2 = [];
    for (let i = 1; i <= n; i++) {
      a[i] = nextInt();
      if (a[i] === 0) pos0.push(i);
      else if (a[i] === 1) pos1.push(i);
      else pos2.push(i);
    }
    const c0 = pos0.length;
    const c1 = pos1.length;
    const ops = [];
    const set1 = new Set(pos1);
    const set2 = new Set(pos2);
    const set0 = new Set(pos0);

    let p0 = 0;
    let p1 = 0;
    for (let i = 1; i <= c0; i++) {
      if (a[i] === 0) continue;
      if (a[i] === 1) {
        while (pos0[pos0.length - 1] <= c0) pos0.pop();
        const j = pos0.pop();
        ops.push([i, j]);
        a[i] = 0;
        a[j] = 1;
        set1.delete(i);
        set1.add(j);
      } else if (a[i] === 2) {
        let k = -1;
        for (const idx of set1) {
          k = idx;
          break;
        }
        ops.push([i, k]);
        a[i] = 1;
        a[k] = 2;
        set1.delete(k);
        set1.add(i);
        while (pos0[pos0.length - 1] <= c0) pos0.pop();
        const j = pos0.pop();
        ops.push([i, j]);
        a[i] = 0;
        a[j] = 1;
        set1.delete(i);
        set1.add(j);
      }
    }
    for (let i = c0 + 1; i <= c0 + c1; i++) {
      if (a[i] === 1) continue;
      if (a[i] === 2) {
        let j = -1;
        for (const idx of set1) {
          if (idx > c0 + c1) {
            j = idx;
            break;
          }
        }
        ops.push([i, j]);
        a[i] = 1;
        a[j] = 2;
        set1.delete(j);
        set1.add(i);
      }
    }
    out.push(ops.length);
    for (let i = 0; i < ops.length; i++) {
      out.push(ops[i][0] + ' ' + ops[i][1]);
    }
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '1\n4\n1 0 2 1\n',
        output: '2\n1 2\n3 4\n'
      }
    ]
  }
];

const daySolDir = path.resolve(__dirname, '..', 'practice', 'days', '2026-11-24', 'solutions');
const dayTestsDir = path.resolve(__dirname, '..', 'practice', 'days', '2026-11-24', 'tests');
const rootSolDir = path.resolve(__dirname, '..', 'solutions');

for (const p of batch3) {
  fs.writeFileSync(path.join(daySolDir, p.file + '.js'), p.code, 'utf8');
  fs.writeFileSync(path.join(rootSolDir, p.file + '.js'), p.code, 'utf8');
  fs.writeFileSync(path.join(dayTestsDir, p.file + '.json'), JSON.stringify(p.tests, null, 2), 'utf8');
  console.log('✓ Wrote', p.file);
}
