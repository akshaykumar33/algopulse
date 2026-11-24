const fs = require('fs');
const path = require('path');

const date = '2026-11-24';
const solDir = path.join('practice', 'days', date, 'solutions');
const testDir = path.join('practice', 'days', date, 'tests');
const expDir = path.join('practice', 'days', date, 'explanations');
const rootSolDir = 'solutions';

const ccData = JSON.parse(fs.readFileSync('scripts/cc_clean_data.json', 'utf8'));

const batch5Solutions = {};

batch5Solutions['disjointNonDecreasingArray'] = `const fs = require('fs');

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
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    let sorted = true;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] > a[i + 1]) {
        sorted = false;
        break;
      }
    }
    if (sorted) {
      out.push('Yes');
      continue;
    }
    const s = [];
    for (let i = 1; i < n; i++) {
      if (a[i - 1] > a[i]) s.push(i);
    }
    let consecutive = false;
    for (let k = 0; k < s.length - 1; k++) {
      if (s[k + 1] === s[k] + 1) {
        consecutive = true;
        break;
      }
    }
    if (consecutive) {
      out.push('No');
      continue;
    }
    let x = 0;
    for (let k = 0; k < s.length; k++) {
      const idx = s[k];
      const diff = a[idx - 1] - a[idx];
      if (diff > x) x = diff;
    }
    for (let k = 0; k < s.length; k++) {
      a[s[k]] += x;
    }
    let ok = true;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] > a[i + 1]) {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'Yes' : 'No');
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['minimumCostWalk'] = `const fs = require('fs');

class MinHeap {
  constructor() {
    this.h = [];
  }
  push(val) {
    this.h.push(val);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p][0] <= this.h[i][0]) break;
      const t = this.h[p];
      this.h[p] = this.h[i];
      this.h[i] = t;
      i = p;
    }
  }
  pop() {
    if (this.h.length === 0) return null;
    const res = this.h[0];
    const top = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = top;
      let i = 0;
      const len = this.h.length;
      while (true) {
        const l = (i << 1) + 1;
        const r = l + 1;
        let min = i;
        if (l < len && this.h[l][0] < this.h[min][0]) min = l;
        if (r < len && this.h[r][0] < this.h[min][0]) min = r;
        if (min === i) break;
        const t = this.h[i];
        this.h[i] = this.h[min];
        this.h[min] = t;
        i = min;
      }
    }
    return res;
  }
  get size() {
    return this.h.length;
  }
}

function dijkstra(n, adj, src) {
  const dist = new Float64Array(n + 1).fill(Infinity);
  dist[src] = 0;
  const pq = new MinHeap();
  pq.push([0, src]);
  while (pq.size > 0) {
    const [d, u] = pq.pop();
    if (d > dist[u]) continue;
    const neighbors = adj[u];
    if (!neighbors) continue;
    for (let i = 0; i < neighbors.length; i += 2) {
      const v = neighbors[i];
      const w = neighbors[i + 1];
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
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
    const m = nextInt();
    const s = nextInt();
    const t = nextInt();
    const v = nextInt();
    const adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < m; i++) {
      const u = nextInt();
      const wNode = nextInt();
      const c = nextInt();
      adj[u].push(wNode, c);
      adj[wNode].push(u, c);
    }
    const ds = dijkstra(n, adj, s);
    const dt = dijkstra(n, adj, t);
    const dv = dijkstra(n, adj, v);
    let ans = Infinity;
    for (let x = 1; x <= n; x++) {
      const total = ds[x] + dt[x] + dv[x];
      if (total < ans) ans = total;
    }
    out.push(ans);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['averageOfPairs'] = `const fs = require('fs');

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
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  const freq = new Int32Array(2001);
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    freq.fill(0);
    let minVal = 2001;
    let maxVal = -1;
    for (let i = 0; i < n; i++) {
      const val = nextInt() + 1000;
      freq[val]++;
      if (val < minVal) minVal = val;
      if (val > maxVal) maxVal = val;
    }
    let ans = 0;
    for (let u = minVal; u <= maxVal; u++) {
      const cntU = freq[u];
      if (cntU === 0) continue;
      ans += Math.floor((cntU * (cntU - 1)) / 2);
      for (let v = u + 2; v <= maxVal; v += 2) {
        const cntV = freq[v];
        if (cntV === 0) continue;
        const mid = (u + v) >> 1;
        if (freq[mid] > 0) {
          ans += cntU * cntV;
        }
      }
    }
    out.push(ans);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['minimumPlatforms'] = `const fs = require('fs');

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
    const at = new Int32Array(n);
    for (let i = 0; i < n; i++) at[i] = nextInt();
    const dt = new Int32Array(n);
    for (let i = 0; i < n; i++) dt[i] = nextInt();
    at.sort();
    dt.sort();
    let plat = 0;
    let maxPlat = 0;
    let i = 0;
    let j = 0;
    while (i < n && j < n) {
      if (at[i] <= dt[j]) {
        plat++;
        if (plat > maxPlat) maxPlat = plat;
        i++;
      } else {
        plat--;
        j++;
      }
    }
    out.push(maxPlat);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['permutationModK'] = `const fs = require('fs');

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
    const k = nextInt();
    if (k === 1) {
      out.push('-1');
      continue;
    }
    if (k === 2 && (n & 1) === 1) {
      out.push('-1');
      continue;
    }
    if (n === 1) {
      out.push('-1');
      continue;
    }
    let found = false;
    for (let d = 1; d < n; d++) {
      let ok = true;
      for (let i = 1; i <= n; i++) {
        const p_i = ((i - 1 + d) % n) + 1;
        if (p_i % k === i % k) {
          ok = false;
          break;
        }
      }
      if (ok) {
        const p = new Int32Array(n);
        for (let i = 1; i <= n; i++) p[i - 1] = ((i - 1 + d) % n) + 1;
        out.push(p.join(' '));
        found = true;
        break;
      }
    }
    if (!found) {
      out.push('-1');
    }
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['chefAndCodes'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
  const lines = input.split(/\\r?\\n/);
  let lineIdx = 0;
  while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
  if (lineIdx >= lines.length) return;
  const T = parseInt(lines[lineIdx++].trim(), 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const freqSeq = lines[lineIdx++];
    const text = lines[lineIdx++];
    const cnt = new Int32Array(26);
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        cnt[code - 65]++;
      } else if (code >= 97 && code <= 122) {
        cnt[code - 97]++;
      }
    }
    const order = [];
    for (let i = 0; i < 26; i++) order.push(i);
    order.sort((a, b) => {
      if (cnt[a] !== cnt[b]) return cnt[a] - cnt[b];
      return a - b;
    });
    const map = new Int32Array(26);
    for (let i = 0; i < 26; i++) {
      const cipherCharIdx = order[i];
      const plainCharCode = freqSeq.charCodeAt(i);
      map[cipherCharIdx] = plainCharCode;
    }
    const res = [];
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        res.push(String.fromCharCode(map[code - 65] - 32));
      } else if (code >= 97 && code <= 122) {
        res.push(String.fromCharCode(map[code - 97]));
      } else {
        res.push(text[i]);
      }
    }
    out.push(res.join(''));
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['chefAndString'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  const lines = input.split(/\\r?\\n/);
  const out = [];
  for (const line of lines) {
    const s = line.trim();
    if (!s) continue;
    let c = 0;
    let h = 0;
    let e = 0;
    let f = 0;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === 'C') {
        c++;
      } else if (ch === 'H') {
        if (c > 0) {
          c--;
          h++;
        }
      } else if (ch === 'E') {
        if (h > 0) {
          h--;
          e++;
        }
      } else if (ch === 'F') {
        if (e > 0) {
          e--;
          f++;
        }
      }
    }
    out.push(f);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['buyingSweets'] = `const fs = require('fs');

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
    let r = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) b[i] = nextInt();
    const idx = new Int32Array(n);
    for (let i = 0; i < n; i++) idx[i] = i;
    idx.sort((i1, i2) => {
      const c1 = a[i1] - b[i1];
      const c2 = a[i2] - b[i2];
      if (c1 !== c2) return c1 - c2;
      return a[i1] - a[i2];
    });
    let total = 0;
    for (let k = 0; k < n; k++) {
      const i = idx[k];
      const price = a[i];
      const net = price - b[i];
      if (r >= price) {
        const count = 1 + Math.floor((r - price) / net);
        total += count;
        r -= count * net;
      }
    }
    out.push(total);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['fairDistribution'] = `const fs = require('fs');

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
    let suf = 0;
    let ok = true;
    for (let i = n - 1; i >= 0; i--) {
      suf += s[i] === '1' ? 1 : -1;
      if (suf < -1 || suf > 1) {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['monochromeCut'] = `const fs = require('fs');

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
    const a = lines[lineIdx++].trim().split(/\\s+/).map(Number);
    const s = lines[lineIdx++].trim();
    let m = 0;
    for (let i = 0; i < n; i++) if (a[i] > m) m = a[i];
    const maxPos = [];
    for (let i = 0; i < n; i++) if (a[i] === m) maxPos.push(i);
    let checkPos = [];
    if (maxPos.length <= 4) {
      checkPos = maxPos;
    } else {
      checkPos = [maxPos[0], maxPos[1], maxPos[maxPos.length - 2], maxPos[maxPos.length - 1]];
    }
    let best = 0;
    for (let pIdx = 0; pIdx < checkPos.length; pIdx++) {
      const pos = checkPos[pIdx];
      const unrolledA = new Int32Array(n - 1);
      const unrolledS = [];
      for (let k = 1; k < n; k++) {
        const idx = (pos + k) % n;
        unrolledA[k - 1] = a[idx];
        unrolledS.push(s[idx]);
      }
      for (let c = 0; c <= 1; c++) {
        const charC = c === 0 ? '0' : '1';
        let firstL = -1;
        let lastR = -1;
        for (let L = 0; L < n - 1; L++) {
          const origL = (pos + 1 + L) % n;
          const prev = (origL - 1 + n) % n;
          if (unrolledS[L] === charC && s[prev] !== s[origL]) {
            firstL = L;
            break;
          }
        }
        for (let R = n - 2; R >= 0; R--) {
          const origR = (pos + 1 + R) % n;
          const next = (origR + 1) % n;
          if (unrolledS[R] === charC && s[origR] !== s[next]) {
            lastR = R;
            break;
          }
        }
        if (firstL !== -1 && lastR !== -1 && firstL <= lastR) {
          let subMax = 0;
          for (let k = firstL; k <= lastR; k++) {
            if (unrolledA[k] > subMax) subMax = unrolledA[k];
          }
          if (m + subMax > best) best = m + subMax;
        }
      }
      if (best === 2 * m) break;
    }
    out.push(best);
  }
  console.log(out.join('\\n'));
}

solve();
`;

batch5Solutions['compareThoseStrings'] = `const fs = require('fs');

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
    const a = lines[lineIdx++].trim();
    const b = lines[lineIdx++].trim();
    let ans = 0;
    let nextOk = false;
    for (let i = n - 1; i >= 0; i--) {
      if (a[i] < b[i]) {
        nextOk = true;
        ans++;
      } else if (a[i] > b[i]) {
        nextOk = false;
      } else {
        if (nextOk) ans++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\\n'));
}

solve();
`;

// Write solutions, tests, explanations
for (const [prob, code] of Object.entries(batch5Solutions)) {
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
Solve problem \${prob} with optimal mathematical invariants and linear / logarithmic scan.
`;
  fs.writeFileSync(ePath, explanation);
  console.log('Written:', prob);
}
