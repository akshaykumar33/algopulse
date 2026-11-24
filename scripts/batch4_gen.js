const fs = require('fs');
const path = require('path');

const batch4 = [
  {
    file: 'manyChefs',
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
  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];
  const target = ['C', 'H', 'E', 'F'];
  for (let tc = 0; tc < t; tc++) {
    const s = nextToken().split('');
    const m = s.length;
    for (let i = m - 4; i >= 0; i--) {
      let ok = true;
      for (let j = 0; j < 4; j++) {
        if (s[i + j] !== '?' && s[i + j] !== target[j]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        for (let j = 0; j < 4; j++) {
          s[i + j] = target[j];
        }
        i -= 3;
      }
    }
    for (let i = 0; i < m; i++) {
      if (s[i] === '?') s[i] = 'A';
    }
    out.push(s.join(''));
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '5\n????CIELIS???E?\n????CIELISOUR???F\nT?KEITE?SY\n????????\n???C???\n',
        output: 'CHEFCIELISACHEF\nCHEFCIELISOURCHEF\nTAKEITEASY\nCHEFCHEF\nAAACHEF\n'
      }
    ]
  },
  {
    file: 'movingCoins',
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
    const k = nextInt();
    const x = new Int32Array(n);
    for (let i = 0; i < n; i++) x[i] = nextInt();
    let ans = 0;
    for (let i = 0; i < n; i++) {
      const gap = (i === 0 ? x[0] - 1 : x[i] - x[i - 1] - 1);
      const weight = Math.ceil((n - i) / k);
      ans += gap * weight;
    }
    out.push(ans);
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '2\n3 2\n2 4 7\n5 3\n1 2 3 4 5\n',
        output: '5\n0\n'
      }
    ]
  },
  {
    file: 'findPermutation',
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
    const total = 2 * n;
    const firstPos = new Int32Array(n + 1).fill(-1);
    const seen = [];
    for (let i = 0; i < total; i++) {
      const v = nextInt();
      if (firstPos[v] === -1) {
        firstPos[v] = i;
        seen.push(v);
      }
    }
    out.push(seen.join(' '));
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '3\n1\n1 1\n2\n1 2 2 1\n3\n1 1 2 2 3 3\n',
        output: '1\n1 2\n1 2 3\n'
      }
    ]
  },
  {
    file: 'oneDimensionalKingdoms',
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
    const intervals = [];
    for (let i = 0; i < n; i++) {
      const l = nextInt();
      const r = nextInt();
      intervals.push([l, r]);
    }
    intervals.sort((a, b) => a[1] - b[1]);
    let bombs = 0;
    let lastBomb = -1;
    for (let i = 0; i < n; i++) {
      if (intervals[i][0] > lastBomb) {
        bombs++;
        lastBomb = intervals[i][1];
      }
    }
    out.push(bombs);
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '1\n3\n1 3\n2 5\n6 9\n',
        output: '2\n'
      }
    ]
  },
  {
    file: 'strangeFunction',
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
  function dr(x) {
    const r = x % 9n;
    return r === 0n ? 9n : r;
  }
  function mul(x, y) {
    return dr(x * y);
  }
  for (let tc = 0; tc < t; tc++) {
    const a = nextBigInt();
    let n = nextBigInt();
    let base = dr(a);
    let res = 1n;
    while (n > 0n) {
      if (n & 1n) res = mul(res, base);
      base = mul(base, base);
      n >>= 1n;
    }
    out.push(res.toString());
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '3\n5 2\n7 2\n127 1\n',
        output: '7\n4\n1\n'
      }
    ]
  },
  {
    file: 'munchysModulo',
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
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    a.sort();
    let ans = a[n - 2];
    if (a[n - 2] + a[n - 3] > a[n - 1]) {
      ans = a[n - 1];
    } else {
      const top = a[n - 1];
      for (let j = n - 2; j >= 0; j--) {
        for (let k = j - 1; k >= 0; k--) {
          const div = a[j] + a[k];
          if (div <= ans) break;
          const rem = top % div;
          if (rem > ans) ans = rem;
        }
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
        input: '2\n3\n1 2 3\n3\n1 3 3\n',
        output: '2\n3\n'
      }
    ]
  },
  {
    file: 'booksInLibrary',
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
    const a = nextInt();
    const b = new Int32Array(n);
    let maxB = 0;
    let sumB = 0;
    for (let i = 0; i < n; i++) {
      b[i] = nextInt();
      if (b[i] > maxB) maxB = b[i];
      sumB += b[i];
    }
    let low = maxB;
    let high = sumB;
    let ans = high;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      let count = 1;
      let cur = 0;
      for (let i = 0; i < n; i++) {
        if (cur + b[i] > mid) {
          count++;
          cur = b[i];
        } else {
          cur += b[i];
        }
      }
      if (count <= a) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
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
        input: '2\n5 2\n4 8 2 6 10\n5 5\n10 5 10 12 18\n',
        output: '16\n18\n'
      }
    ]
  },
  {
    file: 'teamName',
    code: `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const map = new Map();
    for (let i = 0; i < n; i++) {
      const word = input[ptr++];
      const c = word[0];
      const suf = word.slice(1);
      if (!map.has(c)) map.set(c, new Set());
      map.get(c).add(suf);
    }

    const chars = Array.from(map.keys());
    let total = 0;
    for (let i = 0; i < chars.length; i++) {
      const s1 = map.get(chars[i]);
      for (let j = i + 1; j < chars.length; j++) {
        const s2 = map.get(chars[j]);
        let common = 0;
        const [small, large] = s1.size <= s2.size ? [s1, s2] : [s2, s1];
        for (const suf of small) {
          if (large.has(suf)) common++;
        }
        total += 2 * (s1.size - common) * (s2.size - common);
      }
    }
    out.push(total);
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '3\n2\nsuf mas\n3\ngood game guys\n4\nhell bell best test\n',
        output: '2\n0\n2\n'
      }
    ]
  }
];

const daySolDir = path.resolve(__dirname, '..', 'practice', 'days', '2026-11-24', 'solutions');
const dayTestsDir = path.resolve(__dirname, '..', 'practice', 'days', '2026-11-24', 'tests');
const rootSolDir = path.resolve(__dirname, '..', 'solutions');

for (const p of batch4) {
  fs.writeFileSync(path.join(daySolDir, p.file + '.js'), p.code, 'utf8');
  fs.writeFileSync(path.join(rootSolDir, p.file + '.js'), p.code, 'utf8');
  fs.writeFileSync(path.join(dayTestsDir, p.file + '.json'), JSON.stringify(p.tests, null, 2), 'utf8');
  console.log('✓ Wrote', p.file);
}
