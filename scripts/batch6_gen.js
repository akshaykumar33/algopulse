const fs = require('fs');
const path = require('path');

const date = '2026-11-24';
const solDir = path.join('practice', 'days', date, 'solutions');
const testDir = path.join('practice', 'days', date, 'tests');
const expDir = path.join('practice', 'days', date, 'explanations');
const rootSolDir = 'solutions';

const ccData = JSON.parse(fs.readFileSync('scripts/cc_clean_data.json', 'utf8'));

const batch6Solutions = {};

batch6Solutions['artOfBalance'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  const lines = input.split(/\\r?\\n/);
  let lineIdx = 0;
  while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
  if (lineIdx >= lines.length) return;
  const T = parseInt(lines[lineIdx++].trim(), 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const s = lines[lineIdx++].trim();
    const len = s.length;
    const cnt = new Int32Array(26);
    for (let i = 0; i < len; i++) {
      cnt[s.charCodeAt(i) - 65]++;
    }
    cnt.sort();
    cnt.reverse();
    let minOps = len;
    for (let k = 1; k <= 26; k++) {
      if (len % k === 0) {
        const target = Math.floor(len / k);
        let match = 0;
        for (let i = 0; i < k; i++) {
          match += Math.min(cnt[i], target);
        }
        const ops = len - match;
        if (ops < minOps) minOps = ops;
      }
    }
    out.push(minOps);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch6Solutions['voteForTheNoodleSoup'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  const lines = input.split(/\\r?\\n/);
  let lineIdx = 0;
  const out = [];
  while (lineIdx < lines.length) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++].trim(), 10);
    if (isNaN(n) || n === 0) break;
    let K = 0;
    for (let i = 0; i < n; i++) {
      while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
      if (lineIdx >= lines.length) break;
      const parts = lines[lineIdx++].trim().split(/\\s+/);
      const vote = parts[0];
      const score = parseInt(parts[1], 10);
      const p = vote === 'P' ? 1 : -1;
      const O = score - p;
      const absO = Math.abs(O);
      if (K < absO) K = absO;
      if ((K - absO) % 2 !== 0) K++;
    }
    out.push(K);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch6Solutions['sumAndGCD'] = `const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
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
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const raw = new Int32Array(n);
    for (let i = 0; i < n; i++) raw[i] = nextInt();
    raw.sort();
    const u = [];
    for (let i = 0; i < n; i++) {
      if (i === 0 || raw[i] !== raw[i - 1]) u.push(raw[i]);
    }
    const m = u.length;
    if (m === 1) {
      out.push(u[0] * 2);
      continue;
    }
    if (m === 2) {
      out.push(u[0] + u[1]);
      continue;
    }
    const pref = new Int32Array(m);
    const suff = new Int32Array(m);
    pref[0] = u[0];
    for (let i = 1; i < m; i++) pref[i] = gcd(pref[i - 1], u[i]);
    suff[m - 1] = u[m - 1];
    for (let i = m - 2; i >= 0; i--) suff[i] = gcd(suff[i + 1], u[i]);
    let ans = 0;
    for (let i = 0; i < m; i++) {
      let otherGcd = 0;
      if (i === 0) otherGcd = suff[1];
      else if (i === m - 1) otherGcd = pref[m - 2];
      else otherGcd = gcd(pref[i - 1], suff[i + 1]);
      const total = u[i] + otherGcd;
      if (total > ans) ans = total;
    }
    out.push(ans);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch6Solutions['sumOfModes'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  const lines = input.split(/\\r?\\n/);
  let lineIdx = 0;
  while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
  if (lineIdx >= lines.length) return;
  const T = parseInt(lines[lineIdx++].trim(), 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++].trim(), 10);
    const s = lines[lineIdx++].trim();
    const offset = n;
    const freq = new Int32Array(2 * n + 1);
    let cur = offset;
    freq[cur]++;
    let equalCount = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') cur++;
      else cur--;
      equalCount += freq[cur];
      freq[cur]++;
    }
    const totalSubstrings = Math.floor((n * (n + 1)) / 2);
    out.push(totalSubstrings + equalCount);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch6Solutions['strings'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  let ones = 0;
  let zeros = 0;
  let inZeros = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '1') {
      ones++;
    } else if (input[i] === '0') {
      inZeros = true;
      zeros++;
    }
  }
  if (ones === 1) {
    console.log(input + ' 0');
    return;
  }
  const a = '1' + '0'.repeat(ones + zeros);
  const b = '1' + '0'.repeat(zeros);
  console.log(a + ' ' + b);
}

solve();
`;

batch6Solutions['capitalMovement'] = `const fs = require('fs');

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
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const p = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) p[i] = nextInt();
    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(2 * n);
    const nextEdge = new Int32Array(2 * n);
    let edgeCnt = 0;
    for (let i = 0; i < n - 1; i++) {
      const u = nextInt();
      const v = nextInt();
      to[edgeCnt] = v;
      nextEdge[edgeCnt] = head[u];
      head[u] = edgeCnt++;
      to[edgeCnt] = u;
      nextEdge[edgeCnt] = head[v];
      head[v] = edgeCnt++;
    }
    const order = new Int32Array(n);
    for (let i = 0; i < n; i++) order[i] = i + 1;
    order.sort((a, b) => p[b] - p[a]);
    const blocked = new Uint8Array(n + 1);
    const ans = new Int32Array(n);
    for (let v = 1; v <= n; v++) {
      blocked[v] = 1;
      let e = head[v];
      while (e !== -1) {
        blocked[to[e]] = 1;
        e = nextEdge[e];
      }
      let capital = 0;
      for (let k = 0; k < n; k++) {
        const candidate = order[k];
        if (blocked[candidate] === 0) {
          capital = candidate;
          break;
        }
      }
      ans[v - 1] = capital;
      blocked[v] = 0;
      e = head[v];
      while (e !== -1) {
        blocked[to[e]] = 0;
        e = nextEdge[e];
      }
    }
    out.push(ans.join(' '));
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch6Solutions['substringMinimumFunction'] = `const fs = require('fs');

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
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const m = nextInt();
    const z = n - m;
    const parts = m + 1;
    const q = Math.floor(z / parts);
    const r = z % parts;
    const costShort = Math.floor((q * (q + 1)) / 2);
    const costLong = Math.floor(((q + 1) * (q + 2)) / 2);
    const total = r * costLong + (parts - r) * costShort;
    out.push(total);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch6Solutions['theLastProblem'] = `const fs = require('fs');

function cell(x, y) {
  const sum = x + y;
  return Math.floor(((sum - 2) * (sum - 1)) / 2) + x;
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
  for (let tc = 0; tc < T; tc++) {
    const x1 = nextInt();
    const y1 = nextInt();
    const x2 = nextInt();
    const y2 = nextInt();
    let sum = 0;
    for (let i = x1; i <= x2; i++) {
      sum += cell(i, y1);
    }
    for (let j = y1 + 1; j <= y2; j++) {
      sum += cell(x2, j);
    }
    out.push(sum);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch6Solutions['breakingIntoAtoms'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  const lines = input.split(/\\r?\\n/);
  let lineIdx = 0;
  while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
  if (lineIdx >= lines.length) return;
  const T = parseInt(lines[lineIdx++].trim(), 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const parts = lines[lineIdx++].trim().split(/\\s+/);
    const n = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const bitmask = new Int32Array(n);
    for (let i = 0; i < m; i++) {
      while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
      if (lineIdx >= lines.length) break;
      const sParts = lines[lineIdx++].trim().split(/\\s+/);
      const v = parseInt(sParts[0], 10);
      for (let j = 1; j <= v; j++) {
        const x = parseInt(sParts[j], 10);
        bitmask[x] |= 1 << i;
      }
    }
    bitmask.sort();
    let distinct = 0;
    for (let i = 0; i < n; i++) {
      if (i === 0 || bitmask[i] !== bitmask[i - 1]) distinct++;
    }
    out.push(distinct);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch6Solutions['brokenLife'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  const lines = input.split(/\\r?\\n/);
  let lineIdx = 0;
  while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
  if (lineIdx >= lines.length) return;
  const T = parseInt(lines[lineIdx++].trim(), 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const lenParts = lines[lineIdx++].trim().split(/\\s+/);
    const n = parseInt(lenParts[0], 10);
    const m = parseInt(lenParts[1], 10);
    const s = lines[lineIdx++].trim();
    const a = lines[lineIdx++].trim();
    let j = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] !== '?') {
        if (s[i] === a[j]) {
          j++;
          if (j === m) break;
        }
      }
    }
    if (j === m) {
      out.push('-1');
      continue;
    }
    const res = [];
    j = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] !== '?') {
        res.push(s[i]);
        if (j < m && s[i] === a[j]) j++;
      } else {
        const target = j < m ? a[j] : 'z';
        const pick = target === 'a' ? 'e' : 'a';
        res.push(pick);
      }
    }
    out.push(res.join(''));
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch6Solutions['hailXOR'] = `const fs = require('fs');

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
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    let x = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    let i = 0;
    while (i < n - 1 && x > 0) {
      if (a[i] === 0) {
        i++;
        continue;
      }
      let p = 30;
      while ((a[i] & (1 << p)) === 0) p--;
      const mask = 1 << p;
      a[i] ^= mask;
      let found = false;
      for (let j = i + 1; j < n; j++) {
        if ((a[j] & mask) !== 0) {
          a[j] ^= mask;
          found = true;
          break;
        }
      }
      if (!found) {
        a[n - 1] ^= mask;
      }
      x--;
    }
    if (x === 1 || (x % 2 === 1 && n === 2)) {
      a[n - 2] ^= 1;
      a[n - 1] ^= 1;
    }
    out.push(a.join(' '));
  }
  console.log(out.join('\\n'));
}

solve();
`;

// Write solutions, tests, explanations
for (const [prob, code] of Object.entries(batch6Solutions)) {
  const pPath = path.join(solDir, prob + '.js');
  const rPath = path.join(rootSolDir, prob + '.js');
  fs.writeFileSync(pPath, code);
  fs.writeFileSync(rPath, code);

  // Write tests
  const item = ccData[prob];
  if (item && item.samples) {
    const tPath = path.join(testDir, prob + '.json');
    fs.writeFileSync(tPath, JSON.stringify(item.samples, null, 2));
  }

  // Write explanations
  const ePath = path.join(expDir, prob + '.md');
  const explanation = `# \${prob}

## Intuition & Method
Solve problem \${prob} with optimal mathematical invariants and bit manipulation / prefix algorithms.
`;
  fs.writeFileSync(ePath, explanation);
  console.log('Written:', prob);
}
