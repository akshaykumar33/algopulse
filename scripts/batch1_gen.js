const fs = require('fs');
const path = require('path');

const batch1 = [
  {
    file: 'circularDance',
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
  const a = new Int32Array(n + 1);
  const b = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    a[i] = nextInt();
    b[i] = nextInt();
  }
  if (n === 3) {
    console.log('1 2 3');
    return;
  }
  const res = new Int32Array(n);
  res[0] = 1;
  const u1 = a[1];
  const v1 = b[1];
  if (a[u1] === v1 || b[u1] === v1) {
    res[1] = u1;
  } else {
    res[1] = v1;
  }
  for (let i = 1; i < n - 1; i++) {
    const cur = res[i];
    const prev = res[i - 1];
    if (a[cur] === a[prev] || a[cur] === b[prev]) {
      res[i + 1] = a[cur];
    } else {
      res[i + 1] = b[cur];
    }
  }
  console.log(res.join(' '));
}

solve();
`,
    tests: [
      {
        input: '5\n3 2\n4 3\n5 4\n1 5\n2 1\n',
        output: '1 2 3 4 5\n'
      },
      {
        input: '3\n2 3\n3 1\n1 2\n',
        output: '1 2 3\n'
      }
    ]
  },
  {
    file: 'hobbitsParty',
    code: `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = parseInt(input, 10);
  let k = 0;
  while ((k + 1) * k / 2 <= n) {
    k++;
  }
  const groups = Array.from({ length: k }, () => []);
  let cur = 1;
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      groups[i].push(cur);
      groups[j].push(cur);
      cur++;
    }
  }
  const out = [k.toString()];
  for (let i = 0; i < k; i++) {
    out.push(groups[i].join(' '));
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '4\n',
        output: '3\n1 2\n1 3\n2 3\n'
      }
    ]
  },
  {
    file: 'unusualProduct',
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
  let cur = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const v = nextInt();
      if (i === j) cur ^= v;
    }
  }
  const q = nextInt();
  const out = [];
  for (let k = 0; k < q; k++) {
    const t = nextInt();
    if (t === 1 || t === 2) {
      nextInt();
      cur ^= 1;
    } else {
      out.push(cur);
    }
  }
  console.log(out.join(''));
}

solve();
`,
    tests: [
      {
        input: '3\n1 1 1\n0 1 1\n1 0 0\n12\n3\n2 3\n3\n2 2\n2 2\n1 3\n3\n3\n1 2\n2 1\n1 1\n3\n',
        output: '01001\n'
      }
    ]
  },
  {
    file: 'catchOverflow',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const l = parseInt(tokens[ptr++], 10);
  const LIMIT = 4294967295n;
  const st = [1n];
  let x = 0n;
  let overflow = false;
  for (let i = 0; i < l; i++) {
    const cmd = tokens[ptr++];
    if (cmd === 'for') {
      const n = BigInt(tokens[ptr++]);
      const top = st[st.length - 1];
      let nextVal = top * n;
      if (nextVal > LIMIT) nextVal = LIMIT + 1n;
      st.push(nextVal);
    } else if (cmd === 'end') {
      st.pop();
    } else if (cmd === 'add') {
      const addVal = st[st.length - 1];
      if (addVal > LIMIT || x > LIMIT - addVal) {
        overflow = true;
      } else {
        x += addVal;
      }
    }
  }
  if (overflow || x > LIMIT) {
    console.log('OVERFLOW!!!');
  } else {
    console.log(x.toString());
  }
}

solve();
`,
    tests: [
      {
        input: '9\nadd\nfor 43\nend\nfor 10\nfor 15\nadd\nend\nadd\nend\n',
        output: '161\n'
      },
      {
        input: '11\nfor 100\nfor 100\nfor 100\nfor 100\nfor 100\nadd\nend\nend\nend\nend\nend\n',
        output: 'OVERFLOW!!!\n'
      }
    ]
  },
  {
    file: 'campSchedule',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const s = tokens[0];
  const t = tokens[1];
  let c0 = 0;
  let c1 = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '0') c0++;
    else c1++;
  }
  const m = t.length;
  const pi = new Int32Array(m);
  for (let i = 1; i < m; i++) {
    let j = pi[i - 1];
    while (j > 0 && t[i] !== t[j]) j = pi[j - 1];
    if (t[i] === t[j]) j++;
    pi[i] = j;
  }
  const res = [];
  let cur = 0;
  for (let i = 0; i < s.length; i++) {
    const need = t[cur];
    if (need === '0' && c0 > 0) {
      res.push('0');
      c0--;
      cur++;
    } else if (need === '1' && c1 > 0) {
      res.push('1');
      c1--;
      cur++;
    } else {
      while (c0 > 0) {
        res.push('0');
        c0--;
      }
      while (c1 > 0) {
        res.push('1');
        c1--;
      }
      break;
    }
    if (cur === m) cur = pi[m - 1];
  }
  console.log(res.join(''));
}

solve();
`,
    tests: [
      {
        input: '101101\n110\n',
        output: '110110\n'
      }
    ]
  },
  {
    file: 'reallyBigNumbers',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = BigInt(tokens[0]);
  const s = BigInt(tokens[1]);
  function sumDigits(x) {
    let sum = 0n;
    while (x > 0n) {
      sum += x % 10n;
      x /= 10n;
    }
    return sum;
  }
  let low = 1n;
  let high = n;
  let firstBig = -1n;
  while (low <= high) {
    const mid = (low + high) / 2n;
    if (mid - sumDigits(mid) >= s) {
      firstBig = mid;
      high = mid - 1n;
    } else {
      low = mid + 1n;
    }
  }
  if (firstBig === -1n) {
    console.log('0');
  } else {
    console.log((n - firstBig + 1n).toString());
  }
}

solve();
`,
    tests: [
      {
        input: '12 1\n',
        output: '3\n'
      }
    ]
  },
  {
    file: 'menorah',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = tokens[ptr++];
    const b = tokens[ptr++];
    if (a === b) {
      out.push(0);
      continue;
    }
    const cnt = [[0, 0], [0, 0]];
    for (let i = 0; i < n; i++) {
      const match = a[i] === b[i] ? 1 : 0;
      const isOne = a[i] === '1' ? 1 : 0;
      cnt[match][isOne]++;
    }
    let ans = n + 5;
    const ops1 = cnt[1][0] + cnt[1][1];
    if (ops1 % 2 === 1 && cnt[1][1] - cnt[1][0] === 1) {
      ans = Math.min(ans, ops1);
    }
    const ops2 = cnt[0][0] + cnt[0][1];
    if (ops2 % 2 === 0 && cnt[0][1] === cnt[0][0]) {
      ans = Math.min(ans, ops2);
    }
    out.push(ans > n ? -1 : ans);
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '6\n5\n11000\n00011\n3\n101\n101\n4\n0110\n0011\n4\n0110\n1100\n5\n01101\n11100\n5\n11111\n10000\n',
        output: '4\n0\n2\n2\n2\n1\n'
      }
    ]
  },
  {
    file: 'permutationGame',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(m);
  for (let i = 0; i < m; i++) a[i] = parseInt(tokens[ptr++], 10);
  const p = new Int32Array(n + 1);
  const used = new Uint8Array(n + 1);
  for (let i = 0; i < m - 1; i++) {
    const u = a[i];
    const v = a[i + 1];
    let req = (v - u + n) % n;
    if (req === 0) req = n;
    if (p[u] !== 0 && p[u] !== req) {
      console.log('-1');
      return;
    }
    p[u] = req;
  }
  for (let i = 1; i <= n; i++) {
    if (p[i] !== 0) {
      if (used[p[i]]) {
        console.log('-1');
        return;
      }
      used[p[i]] = 1;
    }
  }
  let unused = 1;
  for (let i = 1; i <= n; i++) {
    if (p[i] === 0) {
      while (unused <= n && used[unused]) unused++;
      p[i] = unused;
      used[unused] = 1;
    }
  }
  const res = [];
  for (let i = 1; i <= n; i++) res.push(p[i]);
  console.log(res.join(' '));
}

solve();
`,
    tests: [
      {
        input: '4 5\n2 3 1 4 4\n',
        output: '3 1 2 4\n'
      }
    ]
  },
  {
    file: 'removeTheBracket',
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
    const n = Number(nextBigInt());
    const s = nextBigInt();
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = nextBigInt();
    let dp0 = 0n;
    let dp1 = 0n;
    let prevY0 = a[0];
    let prevY1 = a[0];
    for (let i = 1; i < n - 1; i++) {
      let x0, y0, x1, y1;
      if (a[i] <= s) {
        x0 = 0n;
        y0 = a[i];
        x1 = a[i];
        y1 = 0n;
      } else {
        x0 = s;
        y0 = a[i] - s;
        x1 = a[i] - s;
        y1 = s;
      }
      const c00 = dp0 + prevY0 * x0;
      const c10 = dp1 + prevY1 * x0;
      const nextDp0 = c00 < c10 ? c00 : c10;
      const c01 = dp0 + prevY0 * x1;
      const c11 = dp1 + prevY1 * x1;
      const nextDp1 = c01 < c11 ? c01 : c11;
      dp0 = nextDp0;
      dp1 = nextDp1;
      prevY0 = y0;
      prevY1 = y1;
    }
    const end0 = dp0 + prevY0 * a[n - 1];
    const end1 = dp1 + prevY1 * a[n - 1];
    const ans = end0 < end1 ? end0 : end1;
    out.push(ans.toString());
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '10\n5 0\n2 0 1 3 4\n5 2\n5 3 4 3 5\n7 2\n7 6 5 4 3 2 1\n5 1\n1 2 3 4 5\n5 2\n1 2 3 4 5\n4 0\n0 1 1 1\n5 5\n4 3 5 6 4\n4 1\n0 2 1 0\n3 99999\n200000 200000 200000\n6 8139\n7976 129785 12984 78561 173685 15480\n',
        output: '0\n18\n32\n11\n14\n0\n16\n0\n40000000000\n2700826806\n'
      }
    ]
  },
  {
    file: 'triangle',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const a = parseInt(tokens[0], 10);
  const b = parseInt(tokens[1], 10);
  for (let x1 = 1; x1 < a; x1++) {
    const rem1 = a * a - x1 * x1;
    const y1 = Math.round(Math.sqrt(rem1));
    if (y1 * y1 !== rem1 || y1 <= 0) continue;
    for (let x2 = 1; x2 < b; x2++) {
      const rem2 = b * b - x2 * x2;
      const y2 = Math.round(Math.sqrt(rem2));
      if (y2 * y2 !== rem2 || y2 <= 0) continue;
      if (x1 * x2 === y1 * y2) {
        const cx1 = x1;
        const cy1 = y1;
        const cx2 = -x2;
        const cy2 = y2;
        if (cx1 !== cx2 && cy1 !== cy2) {
          console.log(\`YES\\n0 0\\n\${cx1} \${cy1}\\n\${cx2} \${cy2}\`);
          return;
        }
      }
    }
  }
  console.log('NO');
}

solve();
`,
    tests: [
      {
        input: '5 5\n',
        output: 'YES\n0 0\n3 4\n-4 3\n'
      },
      {
        input: '1 1\n',
        output: 'NO\n'
      }
    ]
  },
  {
    file: 'anyaAndSmartphone',
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
  const k = nextInt();
  const apps = new Int32Array(n + 1);
  const appPos = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    const id = nextInt();
    apps[i] = id;
    appPos[id] = i;
  }
  let totalEnergy = 0n;
  for (let i = 0; i < m; i++) {
    const id = nextInt();
    const p = appPos[id];
    totalEnergy += BigInt(Math.floor((p - 1) / k) + 1);
    if (p > 1) {
      const prevApp = apps[p - 1];
      apps[p] = prevApp;
      apps[p - 1] = id;
      appPos[id] = p - 1;
      appPos[prevApp] = p;
    }
  }
  console.log(totalEnergy.toString());
}

solve();
`,
    tests: [
      {
        input: '8 3 3\n1 2 3 4 5 6 7 8\n7 8 1\n',
        output: '7\n'
      }
    ]
  }
];

const daySolDir = path.resolve(__dirname, '..', 'practice', 'days', '2026-11-24', 'solutions');
const dayTestsDir = path.resolve(__dirname, '..', 'practice', 'days', '2026-11-24', 'tests');
const rootSolDir = path.resolve(__dirname, '..', 'solutions');
fs.mkdirSync(daySolDir, { recursive: true });
fs.mkdirSync(dayTestsDir, { recursive: true });

for (const p of batch1) {
  fs.writeFileSync(path.join(daySolDir, p.file + '.js'), p.code, 'utf8');
  fs.writeFileSync(path.join(rootSolDir, p.file + '.js'), p.code, 'utf8');
  fs.writeFileSync(path.join(dayTestsDir, p.file + '.json'), JSON.stringify(p.tests, null, 2), 'utf8');
  console.log('✓ Wrote', p.file);
}
