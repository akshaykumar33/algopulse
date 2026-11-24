const fs = require('fs');
const path = require('path');

const batch2 = [
  {
    file: 'movieCritics',
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
  const b = [];
  for (let i = 0; i < n; i++) {
    const v = nextInt();
    if (b.length === 0 || b[b.length - 1] !== v) {
      b.push(v);
    }
  }
  const m = b.length;
  const save = new Int32Array(k + 1);
  for (let i = 0; i < m; i++) {
    const x = b[i];
    let gain = 0;
    if (i > 0 && i < m - 1) {
      if (b[i - 1] === b[i + 1]) gain = 2;
      else gain = 1;
    } else {
      gain = 1;
    }
    save[x] += gain;
  }
  let best = 1;
  let maxSave = -1;
  for (let i = 1; i <= k; i++) {
    if (save[i] > maxSave) {
      maxSave = save[i];
      best = i;
    }
  }
  console.log(best);
}

solve();
`,
    tests: [
      {
        input: '6 3\n1 2 1 3 2 1\n',
        output: '1\n'
      }
    ]
  },
  {
    file: 'treeInfection',
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
    const childCnt = new Int32Array(n + 1);
    for (let i = 2; i <= n; i++) {
      const p = nextInt();
      childCnt[p]++;
    }
    const groups = [1];
    for (let i = 1; i <= n; i++) {
      if (childCnt[i] > 0) groups.push(childCnt[i]);
    }
    groups.sort((a, b) => b - a);
    const m = groups.length;
    let low = m;
    let high = n + 1;
    let ans = high;
    while (low <= high) {
      const mid = (low + high) >> 1;
      let needed = 0;
      for (let i = 0; i < m; i++) {
        const left = mid - i;
        if (left <= 0) needed += groups[i];
        else needed += Math.max(0, groups[i] - left);
      }
      const freeSlots = mid > m ? mid - m : 0;
      if (needed <= freeSlots) {
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
        input: '5\n7\n1 1 1 2 2 4\n5\n5 5 1 4\n2\n1\n3\n3 1\n6\n1 1 1 1 1\n',
        output: '4\n4\n2\n3\n4\n'
      }
    ]
  },
  {
    file: 'eKG',
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
  const x = nextInt();
  const a = new Int32Array(n + 1);
  const nextNode = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    a[i] = nextInt();
    if (a[i] !== 0) {
      nextNode[a[i]] = i;
    }
  }
  let distX = 0;
  const otherLens = [];
  for (let i = 1; i <= n; i++) {
    if (a[i] === 0) {
      let cur = i;
      let len = 0;
      let hasX = false;
      let curDist = 0;
      while (cur !== 0) {
        len++;
        if (cur === x) {
          hasX = true;
          curDist = len;
        }
        cur = nextNode[cur];
      }
      if (hasX) {
        distX = curDist;
      } else {
        otherLens.push(len);
      }
    }
  }
  const dp = new Uint8Array(n + 1);
  dp[0] = 1;
  for (const len of otherLens) {
    for (let s = n; s >= len; s--) {
      if (dp[s - len]) dp[s] = 1;
    }
  }
  const res = [];
  for (let s = 0; s <= n; s++) {
    if (dp[s]) res.push(s + distX);
  }
  console.log(res.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '5 2\n0 1 0 3 4\n',
        output: '2\n5\n'
      }
    ]
  },
  {
    file: 'perfectKeyboard',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let kb = [s[0]];
    let curr = 0;
    const vis = new Uint8Array(26);
    vis[s.charCodeAt(0) - 97] = 1;
    let ok = true;
    for (let i = 1; i < s.length; i++) {
      const c = s[i];
      const code = c.charCodeAt(0) - 97;
      if (vis[code]) {
        if (curr + 1 < kb.length && kb[curr + 1] === c) {
          curr++;
        } else if (curr - 1 >= 0 && kb[curr - 1] === c) {
          curr--;
        } else {
          ok = false;
          break;
        }
      } else {
        if (curr + 1 === kb.length) {
          kb.push(c);
          curr++;
          vis[code] = 1;
        } else if (curr === 0) {
          kb.unshift(c);
          vis[code] = 1;
        } else {
          ok = false;
          break;
        }
      }
    }
    if (!ok) {
      out.push('NO');
    } else {
      for (let i = 0; i < 26; i++) {
        if (!vis[i]) kb.push(String.fromCharCode(97 + i));
      }
      out.push('YES\\n' + kb.join(''));
    }
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '5\nababa\ncodedoca\nabcda\nzxzytyz\nabcdefghijklmnopqrstuvwxyza\n',
        output: 'YES\nabcdefghijklmnopqrstuvwxyz\nYES\nacodebfghijklmnpqrstuvwxyz\nNO\nYES\ntyzxabcdefghijklmnopqrsuvw\nNO\n'
      }
    ]
  },
  {
    file: 'reverseMadness',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const sArr = tokens[ptr++].split('');
    const l = new Int32Array(k);
    for (let i = 0; i < k; i++) l[i] = parseInt(tokens[ptr++], 10) - 1;
    const r = new Int32Array(k);
    for (let i = 0; i < k; i++) r[i] = parseInt(tokens[ptr++], 10) - 1;
    const q = parseInt(tokens[ptr++], 10);
    const diff = new Int32Array(n + 2);
    for (let qi = 0; qi < q; qi++) {
      const x = parseInt(tokens[ptr++], 10) - 1;
      let low = 0, high = k - 1, seg = 0;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (l[mid] <= x) {
          seg = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      const L = l[seg];
      const R = r[seg];
      const a = Math.min(x, L + R - x);
      diff[a]++;
    }
    for (let i = 0; i < k; i++) {
      const L = l[i];
      const R = r[i];
      let cur = 0;
      const mid = Math.floor((L + R) / 2);
      for (let j = L; j <= mid; j++) {
        cur += diff[j];
        if (cur % 2 === 1) {
          const mirror = L + R - j;
          const tmp = sArr[j];
          sArr[j] = sArr[mirror];
          sArr[mirror] = tmp;
        }
      }
    }
    out.push(sArr.join(''));
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '5\n4 2\nabcd\n1 3\n2 4\n2\n1 3\n5 3\nabcde\n1 2 3\n1 2 5\n3\n2 3 4\n3 1\nabc\n1\n3\n1\n2\n6 2\nabbaab\n1 4\n3 6\n4\n1 3 2 5\n6 2\nabbaab\n1 4\n3 6\n1\n3\n',
        output: 'badc\nabedc\nabc\nabbaab\nbbaaab\n'
      }
    ]
  },
  {
    file: 'countingKangaroosIsFun',
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
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  a.sort();
  let i = 0;
  const half = Math.floor(n / 2);
  let j = half;
  let visible = n;
  while (i < half && j < n) {
    if (a[j] >= 2 * a[i]) {
      visible--;
      i++;
      j++;
    } else {
      j++;
    }
  }
  console.log(visible);
}

solve();
`,
    tests: [
      {
        input: '8\n2\n5\n7\n6\n9\n8\n4\n2\n',
        output: '5\n'
      },
      {
        input: '8\n9\n1\n6\n2\n6\n5\n8\n3\n',
        output: '5\n'
      }
    ]
  },
  {
    file: 'modifiedGCD',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  let a = parseInt(tokens[ptr++], 10);
  let b = parseInt(tokens[ptr++], 10);
  let x = a, y = b;
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  const g = x;
  const divs = [];
  for (let i = 1; i * i <= g; i++) {
    if (g % i === 0) {
      divs.push(i);
      if (i * i !== g) divs.push(Math.floor(g / i));
    }
  }
  divs.sort((u, v) => u - v);
  const n = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let q = 0; q < n; q++) {
    const low = parseInt(tokens[ptr++], 10);
    const high = parseInt(tokens[ptr++], 10);
    let l = 0, r = divs.length - 1, best = -1;
    while (l <= r) {
      const mid = (l + r) >> 1;
      if (divs[mid] <= high) {
        best = divs[mid];
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    if (best >= low) out.push(best);
    else out.push(-1);
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '9 27\n3\n1 5\n10 11\n9 11\n',
        output: '3\n-1\n9\n'
      }
    ]
  },
  {
    file: 'vitalyAndStrings',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const s = tokens[0].split('');
  const t = tokens[1];
  const n = s.length;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === 'z') {
      s[i] = 'a';
    } else {
      s[i] = String.fromCharCode(s[i].charCodeAt(0) + 1);
      break;
    }
  }
  const res = s.join('');
  if (res < t) {
    console.log(res);
  } else {
    console.log('No such string');
  }
}

solve();
`,
    tests: [
      {
        input: 'a\nc\n',
        output: 'b\n'
      },
      {
        input: 'a\nb\n',
        output: 'No such string\n'
      }
    ]
  },
  {
    file: 'tennisChampionship',
    code: `const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = BigInt(tokens[0]);
  if (n < 3n) {
    console.log(1);
    return;
  }
  let f1 = 2n;
  let f2 = 3n;
  let wins = 2;
  while (f1 + f2 <= n) {
    const nextF = f1 + f2;
    f1 = f2;
    f2 = nextF;
    wins++;
  }
  console.log(wins);
}

solve();
`,
    tests: [
      {
        input: '2\n',
        output: '1\n'
      },
      {
        input: '3\n',
        output: '2\n'
      },
      {
        input: '4\n',
        output: '2\n'
      }
    ]
  },
  {
    file: 'gardenerAndTree',
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
    if (n === 1) {
      out.push(k >= 1 ? 0 : 1);
      continue;
    }
    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(2 * n);
    const nxt = new Int32Array(2 * n);
    let edgePtr = 0;
    const deg = new Int32Array(n + 1);
    for (let i = 0; i < n - 1; i++) {
      const u = nextInt();
      const v = nextInt();
      to[edgePtr] = v; nxt[edgePtr] = head[u]; head[u] = edgePtr++;
      to[edgePtr] = u; nxt[edgePtr] = head[v]; head[v] = edgePtr++;
      deg[u]++; deg[v]++;
    }
    const q = new Int32Array(n + 1);
    const level = new Int32Array(n + 1);
    let qh = 0, qt = 0;
    for (let i = 1; i <= n; i++) {
      if (deg[i] <= 1) {
        q[qt++] = i;
        level[i] = 1;
      }
    }
    let removed = 0;
    while (qh < qt) {
      const u = q[qh++];
      if (level[u] > k) break;
      removed++;
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = to[e];
        deg[v]--;
        if (deg[v] === 1) {
          level[v] = level[u] + 1;
          q[qt++] = v;
        }
      }
    }
    out.push(n - removed);
  }
  console.log(out.join('\\n'));
}

solve();
`,
    tests: [
      {
        input: '4\n14 1\n1 2\n2 3\n2 4\n4 5\n4 6\n2 7\n7 8\n8 9\n8 10\n3 11\n3 12\n1 13\n13 14\n2 3\n1 2\n3 2\n1 2\n2 3\n4 2\n1 2\n2 3\n3 4\n',
        output: '7\n0\n0\n0\n'
      }
    ]
  },
  {
    file: 'treeCutting',
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
    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(2 * n);
    const nxt = new Int32Array(2 * n);
    let edgePtr = 0;
    for (let i = 0; i < n - 1; i++) {
      const u = nextInt();
      const v = nextInt();
      to[edgePtr] = v; nxt[edgePtr] = head[u]; head[u] = edgePtr++;
      to[edgePtr] = u; nxt[edgePtr] = head[v]; head[v] = edgePtr++;
    }
    const order = new Int32Array(n);
    const parent = new Int32Array(n + 1);
    let qh = 0, qt = 0;
    order[qt++] = 1;
    parent[1] = 0;
    while (qh < qt) {
      const u = order[qh++];
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = to[e];
        if (v !== parent[u]) {
          parent[v] = u;
          order[qt++] = v;
        }
      }
    }
    const sz = new Int32Array(n + 1);
    let low = 1, high = Math.floor(n / (k + 1)), ans = 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      let cuts = 0;
      for (let i = 1; i <= n; i++) sz[i] = 1;
      for (let i = n - 1; i >= 0; i--) {
        const u = order[i];
        if (u !== 1 && sz[u] >= mid) {
          cuts++;
        } else if (u !== 1) {
          sz[parent[u]] += sz[u];
        }
      }
      if (cuts > k || (cuts === k && sz[1] >= mid)) {
        ans = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
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
        input: '6\n5 1\n1 2\n1 3\n3 4\n3 5\n2 1\n1 2\n6 1\n1 2\n2 3\n3 4\n4 5\n5 6\n7 2\n1 2\n1 3\n1 4\n2 5\n2 6\n3 7\n8 3\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 8\n5 2\n1 2\n1 3\n1 4\n1 5\n',
        output: '2\n1\n3\n2\n2\n1\n'
      }
    ]
  }
];

const daySolDir = path.resolve(__dirname, '..', 'practice', 'days', '2026-11-24', 'solutions');
const dayTestsDir = path.resolve(__dirname, '..', 'practice', 'days', '2026-11-24', 'tests');
const rootSolDir = path.resolve(__dirname, '..', 'solutions');
fs.mkdirSync(daySolDir, { recursive: true });
fs.mkdirSync(dayTestsDir, { recursive: true });

for (const p of batch2) {
  fs.writeFileSync(path.join(daySolDir, p.file + '.js'), p.code, 'utf8');
  fs.writeFileSync(path.join(rootSolDir, p.file + '.js'), p.code, 'utf8');
  fs.writeFileSync(path.join(dayTestsDir, p.file + '.json'), JSON.stringify(p.tests, null, 2), 'utf8');
  console.log('✓ Wrote', p.file);
}
