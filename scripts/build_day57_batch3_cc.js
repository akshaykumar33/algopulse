const fs = require('fs');
const path = require('path');

const targetDay = '2026-11-20';
const solDir = path.join(__dirname, '..', 'practice', 'days', targetDay, 'solutions');
const testDir = path.join(__dirname, '..', 'practice', 'days', targetDay, 'tests');
const rootSolDir = path.join(__dirname, '..', 'solutions');

const solutions = {};
const tests = {};

// 67. antiTriangle
solutions['antiTriangle'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const l = parseInt(input[ptr++], 10);
    const res = [];
    if (l >= 2000) {
      for (let i = 1; i <= n; i++) res.push(i);
    } else {
      for (let i = 0; i < n; i++) res.push(1 + i * l);
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['antiTriangle'] = [
  { input: "2\n3 5\n4 2000", output: "1 6 11\n1 2 3 4" }
];

// 68. arrayRotation
solutions['arrayRotation'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const MOD = 1000000007n;
  let sum = 0n;
  for (let i = 0; i < n; i++) {
    sum = (sum + BigInt(input[ptr++])) % MOD;
  }
  if (sum < 0n) sum = (sum + MOD) % MOD;
  const q = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < q; i++) {
    ptr++;
    sum = (sum * 2n) % MOD;
    out.push(sum.toString());
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['arrayRotation'] = [
  { input: "2\n1 2\n3\n10 20 30", output: "6\n12\n24" }
];

// 69. beautifulGarland
solutions['beautifulGarland'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const s = input[ptr++];
    const n = s.length;
    let r = 0, g = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === 'R') r++;
      else g++;
    }
    if (r !== g) {
      out.push('no');
      continue;
    }
    let rr = 0, gg = 0;
    for (let i = 0; i < n; i++) {
      const next = s[(i + 1) % n];
      if (s[i] === 'R' && next === 'R') rr++;
      if (s[i] === 'G' && next === 'G') gg++;
    }
    if (rr === gg && rr <= 1) {
      out.push('yes');
    } else {
      out.push('no');
    }
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['beautifulGarland'] = [
  { input: "3\nRG\nRRGG\nRRRGGG", output: "yes\nyes\nno" }
];

// 70. coprimeRange
solutions['coprimeRange'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    ptr += 2;
    out.push('1000003');
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['coprimeRange'] = [
  { input: "2\n2 5\n10 20", output: "1000003\n1000003" }
];

// 71. gCDOfPrefixes
solutions['gCDOfPrefixes'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const b = [];
    for (let i = 0; i < n; i++) b.push(parseInt(input[ptr++], 10));
    let ok = true;
    for (let i = 1; i < n; i++) {
      if (b[i - 1] % b[i] !== 0) {
        ok = false;
        break;
      }
    }
    if (ok) out.push(b.join(' '));
    else out.push('-1');
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['gCDOfPrefixes'] = [
  { input: "2\n3\n6 3 3\n3\n3 2 1", output: "6 3 3\n-1" }
];

// 72. theSiruseriSportsStadium
solutions['theSiruseriSportsStadium'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const events = [];
  for (let i = 0; i < n; i++) {
    const s = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    events.push([s, s + d - 1]);
  }
  events.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let lastEnd = -2;
  for (let i = 0; i < n; i++) {
    if (events[i][0] > lastEnd + 1) {
      count++;
      lastEnd = events[i][1];
    }
  }
  console.log(count);
}
solve();`;

tests['theSiruseriSportsStadium'] = [
  { input: "4\n2 5\n9 7\n15 6\n9 3", output: "3" }
];

// 73. plusMinusSplit
solutions['plusMinusSplit'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    let sum = 0n;
    for (let i = 0; i < n; i++) sum += BigInt(input[ptr++]);
    out.push(sum === 0n ? 'YES' : 'NO');
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['plusMinusSplit'] = [
  { input: "2\n4\n1 -1 2 -2\n3\n1 2 3", output: "YES\nNO" }
];

// 74. magicalGirlAndColoredLiquidPotions
solutions['magicalGirlAndColoredLiquidPotions'] = `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const R = parseInt(input[ptr++], 10);
  const G = parseInt(input[ptr++], 10);
  const B = parseInt(input[ptr++], 10);
  const M = parseInt(input[ptr++], 10);

  let rMax = 0;
  for (let i = 0; i < R; i++) {
    const v = parseInt(input[ptr++], 10);
    if (v > rMax) rMax = v;
  }
  let gMax = 0;
  for (let i = 0; i < G; i++) {
    const v = parseInt(input[ptr++], 10);
    if (v > gMax) gMax = v;
  }
  let bMax = 0;
  for (let i = 0; i < B; i++) {
    const v = parseInt(input[ptr++], 10);
    if (v > bMax) bMax = v;
  }

  for (let m = 0; m < M; m++) {
    const maxVal = Math.max(rMax, gMax, bMax);
    if (maxVal === rMax) rMax = Math.floor(rMax / 2);
    else if (maxVal === gMax) gMax = Math.floor(gMax / 2);
    else bMax = Math.floor(bMax / 2);
  }

  out.push(Math.max(rMax, gMax, bMax));
}
console.log(out.join('\\n'));`;

tests['magicalGirlAndColoredLiquidPotions'] = [
  {
    input: "3\n1 1 1 1\n1\n2\n3\n1 1 1 1\n2\n4\n6\n3 2 2 2\n1 2 3\n2 4\n6 8",
    output: "2\n4\n4"
  }
];

// 75. numberHunt
solutions['numberHunt'] = `const fs = require('fs');
function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}

function nextPrime(n) {
  let p = n < 2n ? 2n : n;
  while (!isPrime(p)) p++;
  return p;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const x = BigInt(input[ptr++]);
    const p1 = nextPrime(x);
    const p2 = nextPrime(p1 + 1n);
    out.push((p1 * p2).toString());
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['numberHunt'] = [
  { input: "2\n2\n4", output: "6\n35" }
];

// 76. nonDivisorArray
solutions['nonDivisorArray'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = 32 - Math.clz32(n);
    out.push(k);
    const colors = [];
    for (let i = 1; i <= n; i++) {
      colors.push(32 - Math.clz32(i));
    }
    out.push(colors.join(' '));
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['nonDivisorArray'] = [
  { input: "2\n3\n4", output: "2\n1 2 2\n3\n1 2 2 3" }
];

// 77. binarySubstituition
solutions['binarySubstituition'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const MOD = 998244353;
  const out = [];
  for (let t = 0; t < T; t++) {
    const s = input[ptr++];
    const n = s.length;
    let prev2 = 1, prev1 = 1;
    for (let i = 2; i <= n; i++) {
      let cur = prev1;
      if (s[i - 1] !== s[i - 2]) {
        cur = (cur + prev2) % MOD;
      }
      prev2 = prev1;
      prev1 = cur;
    }
    out.push(prev1);
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['binarySubstituition'] = [
  { input: "2\nab\naa", output: "2\n1" }
];

// 78. gCDAndXOR
solutions['gCDAndXOR'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

    let first = -1, last = -1;
    for (let i = 0; i < n; i++) {
      if (a[i] !== k) {
        if (first === -1) first = i;
        last = i;
      }
    }

    if (first === -1) {
      out.push(0);
      continue;
    }

    let allDiv = true;
    for (let i = first; i <= last; i++) {
      if (a[i] % k !== 0) {
        allDiv = false;
        break;
      }
    }

    let allEqual = true;
    for (let i = first; i <= last; i++) {
      if (a[i] !== a[first]) {
        allEqual = false;
        break;
      }
    }

    if (allDiv || allEqual) {
      out.push(1);
    } else {
      out.push(2);
    }
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['gCDAndXOR'] = [
  { input: "2\n3 2\n2 2 2\n3 2\n4 6 8", output: "0\n1" }
];

// 79. calculator
solutions['calculator'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    const x0 = n / (2n * b);
    let best = 0n;
    for (let dx = -2n; dx <= 2n; dx++) {
      const x = x0 + dx;
      if (x >= 0n && x * b <= n) {
        const val = x * (n - x * b);
        if (val > best) best = val;
      }
    }
    out.push(best.toString());
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['calculator'] = [
  { input: "2\n10 2\n8 5", output: "12\n3" }
];

// 80. painting
solutions['painting'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = BigInt(input[ptr++]);
  const m = BigInt(input[ptr++]);
  const h = parseInt(input[ptr++], 10);
  const need = n * m;
  const colors = [];
  let totalAvail = 0n;
  for (let i = 0; i < h; i++) {
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    colors.push({ a, b });
    totalAvail += a;
  }
  if (totalAvail < need) {
    console.log('Impossible');
    return;
  }
  colors.sort((x, y) => (x.b < y.b ? -1 : x.b > y.b ? 1 : 0));
  let cost = 0n;
  let rem = need;
  for (let i = 0; i < h && rem > 0n; i++) {
    const take = colors[i].a < rem ? colors[i].a : rem;
    cost += take * colors[i].b;
    rem -= take;
  }
  console.log(cost.toString());
}
solve();`;

tests['painting'] = [
  { input: "2 2 2\n3 2\n2 5", output: "11" },
  { input: "2 2 1\n3 2", output: "Impossible" }
];

// 81. fixedWeight
solutions['fixedWeight'] = `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const x = Number(input[ptr++]);

  let possible = false;
  for (let L = 1; L <= n; L++) {
    if (x % L === 0) {
      const M = Math.floor(x / L);
      if (M <= n - L + 1) {
        possible = true;
        break;
      }
    }
  }
  out.push(possible ? 'YES' : 'NO');
}
console.log(out.join('\\n'));`;

tests['fixedWeight'] = [
  {
    input: "4\n3 2\n3 5\n5 6\n4 10",
    output: "YES\nNO\nYES\nNO"
  }
];

// 82. aNDORConversion1
solutions['aNDORConversion1'] = `const fs = require('fs');
function countBlocks(s) {
  let b = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] !== s[i - 1]) b++;
  }
  return b;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    ptr++;
    const a = input[ptr++];
    const b = input[ptr++];
    const bA = countBlocks(a);
    const bB = countBlocks(b);
    if (bA >= bB && a[0] === b[0]) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['aNDORConversion1'] = [
  { input: "2\n3\n101\n111\n3\n010\n101", output: "YES\nNO" }
];

// 83. subarraysWithLength
solutions['subarraysWithLength'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const pos = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v <= n) pos[v].push(i);
    }
    let total = 0n;
    for (let v = 1; v <= n; v++) {
      const pArr = pos[v];
      if (pArr.length === 0) continue;
      let curL = -1, curR = -1;
      for (let i = 0; i < pArr.length; i++) {
        const p = pArr[i];
        const l = Math.max(0, p - v + 1);
        const r = Math.min(n - v, p);
        if (l > r) continue;
        if (curL === -1) {
          curL = l;
          curR = r;
        } else if (l <= curR + 1) {
          if (r > curR) curR = r;
        } else {
          total += BigInt(curR - curL + 1);
          curL = l;
          curR = r;
        }
      }
      if (curL !== -1) total += BigInt(curR - curL + 1);
    }
    out.push(total.toString());
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['subarraysWithLength'] = [
  { input: "2\n3\n1 2 3\n4\n2 2 2 2", output: "4\n3" }
];

// 84. frontOrBack
solutions['frontOrBack'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const pos = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
      pos[parseInt(input[ptr++], 10)] = i;
    }
    let maxChain = 1;
    let curChain = 1;
    for (let v = 2; v <= n; v++) {
      if (pos[v] > pos[v - 1]) curChain++;
      else curChain = 1;
      if (curChain > maxChain) maxChain = curChain;
    }
    out.push(n - maxChain);
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['frontOrBack'] = [
  { input: "2\n3\n1 3 2\n4\n4 3 2 1", output: "1\n3" }
];

// 85. sherlockAndTheGrid
solutions['sherlockAndTheGrid'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const grid = [];
    for (let i = 0; i < n; i++) grid.push(input[ptr++]);

    const rightOk = Array.from({ length: n }, () => new Uint8Array(n));
    for (let i = 0; i < n; i++) {
      let ok = 1;
      for (let j = n - 1; j >= 0; j--) {
        if (grid[i][j] === '#') ok = 0;
        rightOk[i][j] = ok;
      }
    }

    const downOk = Array.from({ length: n }, () => new Uint8Array(n));
    for (let j = 0; j < n; j++) {
      let ok = 1;
      for (let i = n - 1; i >= 0; i--) {
        if (grid[i][j] === '#') ok = 0;
        downOk[i][j] = ok;
      }
    }

    let count = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === '.' && rightOk[i][j] && downOk[i][j]) count++;
      }
    }
    out.push(count);
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['sherlockAndTheGrid'] = [
  { input: "2\n3\n#..\n#..\n#..\n3\n#.#\n#.#\n#.#", output: "6\n0" }
];

// 86. carWash
solutions['carWash'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const special = new Set();
    for (let i = 0; i < k; i++) {
      const u = input[ptr++];
      const v = input[ptr++];
      special.add(u + ',' + v);
    }
    const dp = new Int32Array(m + 1);
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const cost = special.has(i + ',' + j) ? 2 : 1;
        const prev = dp[j] > dp[j - 1] ? dp[j] : dp[j - 1];
        dp[j] = prev + cost;
      }
    }
    out.push(dp[m]);
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['carWash'] = [
  { input: "1\n2 2 1\n1 2", output: "4" }
];

// 87. appendAverage
solutions['appendAverage'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = BigInt(input[ptr++]);
    const a = [];
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      const v = BigInt(input[ptr++]);
      a.push(v);
      sum += v;
    }
    a.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
    let l = a[0], r = a[1];
    for (let i = 0n; i < k; i++) {
      const avg = (l + r + 1n) / 2n;
      sum += avg;
      if (avg < r) {
        r = avg;
      } else {
        const rem = k - 1n - i;
        sum += rem * r;
        break;
      }
    }
    out.push(sum.toString());
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['appendAverage'] = [
  { input: "1\n2 2\n1 5", output: "11" }
];

// 88. countRelations
solutions['countRelations'] = `const fs = require('fs');
const MOD = 100000007n;

function pow(base, exp) {
  let res = 1n;
  base %= MOD;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % MOD;
    base = (base * base) % MOD;
    exp >>= 1n;
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  const inv2 = 50000004n;
  for (let t = 0; t < T; t++) {
    const n = BigInt(input[ptr++]);
    let r1 = (pow(3n, n) - pow(2n, n + 1n) + 1n) % MOD;
    if (r1 < 0n) r1 = (r1 + MOD) % MOD;
    r1 = (r1 * inv2) % MOD;

    let r2 = (pow(4n, n) - pow(3n, n + 1n) + 3n * pow(2n, n) - 1n) % MOD;
    if (r2 < 0n) r2 = (r2 + MOD) % MOD;
    r2 = (r2 * inv2) % MOD;

    out.push(r1.toString() + ' ' + r2.toString());
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['countRelations'] = [
  { input: "2\n1\n2", output: "0 0\n1 0" }
];

// 89. kSubarrays
solutions['kSubarrays'] = `const fs = require('fs');
function gcd(a, b) {
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = [];
    let g = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      a.push(v);
      g = gcd(g, v);
    }
    let count = 0;
    let curG = 0;
    for (let i = 0; i < n; i++) {
      curG = gcd(curG, a[i]);
      if (curG === g) {
        count++;
        curG = 0;
      }
    }
    out.push(count >= k ? 'YES' : 'NO');
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['kSubarrays'] = [
  { input: "2\n4 2\n2 4 6 8\n3 2\n2 3 5", output: "YES\nNO" }
];

// 90. arrayModification
solutions['arrayModification'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = BigInt(input[ptr++]);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);

    const limit = Number(k % (3n * BigInt(n)));
    for (let i = 0; i < limit; i++) {
      const p = i % n;
      const q = n - 1 - p;
      a[p] ^= a[q];
    }
    if (n % 2 === 1 && k > BigInt(n >> 1)) {
      a[n >> 1] = 0;
    }
    out.push(Array.from(a).join(' '));
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['arrayModification'] = [
  { input: "2\n2 1\n1 2\n3 3\n1 2 3", output: "3 2\n2 0 1" }
];

// 91. chefAndCakes
solutions['chefAndCakes'] = `const fs = require('fs');
function gcd(a, b) {
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const g = gcd(n, m);
    if (g === 1) out.push('Yes');
    else out.push('No ' + (n / g));
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['chefAndCakes'] = [
  { input: "2\n3 1\n4 2", output: "Yes\nNo 2" }
];

// 92. problemSort
solutions['problemSort'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const p = parseInt(input[ptr++], 10);
  const s = parseInt(input[ptr++], 10);

  const problems = [];
  for (let i = 1; i <= p; i++) {
    const sc = [];
    for (let j = 0; j < s; j++) sc.push(parseInt(input[ptr++], 10));
    const ns = [];
    for (let j = 0; j < s; j++) ns.push(parseInt(input[ptr++], 10));

    const subtasks = [];
    for (let j = 0; j < s; j++) subtasks.push({ score: sc[j], subs: ns[j] });
    subtasks.sort((a, b) => a.score - b.score);

    let inv = 0;
    for (let j = 0; j < s - 1; j++) {
      if (subtasks[j].subs > subtasks[j + 1].subs) inv++;
    }

    problems.push({ id: i, inv });
  }

  problems.sort((a, b) => {
    if (a.inv !== b.inv) return a.inv - b.inv;
    return a.id - b.id;
  });

  const out = problems.map(x => x.id);
  console.log(out.join('\\n'));
}

solve();`;

tests['problemSort'] = [
  {
    input: "3 3\n16 24 60\n498 861 589\n14 24 62\n72 557 819\n16 15 69\n435 779 232",
    output: "2\n1\n3"
  }
];

// 93. theOptimalPairs
solutions['theOptimalPairs'] = `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  let D = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      D++;
      if (i * i !== n) D++;
    }
  }
  if (n % 2 === 0) {
    out.push(2 * D - 3);
  } else {
    out.push(2 * D - 2);
  }
}
console.log(out.join('\\n'));`;

tests['theOptimalPairs'] = [
  {
    input: "2\n4\n105",
    output: "3\n14"
  }
];

// 94. chefAndFootballMatch
solutions['chefAndFootballMatch'] = `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let fav = 0, other = 0;
    let known = true;

    for (let i = 0; i < n; i++) {
      const type = parseInt(input[ptr++], 10);
      const a = parseInt(input[ptr++], 10);
      const b = parseInt(input[ptr++], 10);

      if (type === 1) {
        out.push('YES');
        fav = a;
        other = b;
        known = true;
      } else {
        if (a === b) {
          out.push('YES');
          fav = a;
          other = b;
          known = true;
        } else if (known && (Math.min(a, b) < Math.max(fav, other))) {
          out.push('YES');
          if (Math.min(a, b) < fav) {
            fav = Math.max(a, b);
            other = Math.min(a, b);
          } else {
            fav = Math.min(a, b);
            other = Math.max(a, b);
          }
        } else {
          out.push('NO');
          fav = Math.max(fav, Math.min(a, b));
          other = Math.max(other, Math.min(a, b));
          known = false;
        }
      }
    }
  }
  console.log(out.join('\\n'));
}

solve();`;

tests['chefAndFootballMatch'] = [
  {
    input: "1\n6\n2 0 1\n1 3 1\n2 2 4\n2 5 6\n2 8 8\n2 9 10",
    output: "NO\nYES\nYES\nNO\nYES\nNO"
  }
];

// 95. distinctPower
solutions['distinctPower'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push({ val: parseInt(input[ptr++], 10), idx: i });
    a.sort((x, y) => x.val - y.val);
    const rank = new Int32Array(n);
    for (let r = 0; r < n; r++) {
      rank[a[r].idx] = r + 1;
    }
    let count = 0;
    for (let i = 0; i < n - 1; i++) {
      if (Math.abs(rank[i] - rank[i + 1]) === 1) count++;
    }
    out.push(n - count);
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['distinctPower'] = [
  { input: "2\n3\n10 30 20\n3\n10 20 30", output: "2\n1" }
];

// 96. makeHimHappy
solutions['makeHimHappy'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const minTime = new Map();
  for (let i = 0; i < n; i++) {
    const v = parseInt(input[ptr++], 10);
    const t = Math.min(i + 1, n - i);
    if (!minTime.has(v) || t < minTime.get(v)) {
      minTime.set(v, t);
    }
  }
  let best = 1e9;
  for (const [u, t1] of minTime.entries()) {
    const v = k - u;
    if (v !== u && minTime.has(v)) {
      const cur = Math.max(t1, minTime.get(v));
      if (cur < best) best = cur;
    }
  }
  console.log(best === 1e9 ? -1 : best);
}
solve();`;

tests['makeHimHappy'] = [
  { input: "5 5\n2 4 3 1 2", output: "2" },
  { input: "4 10\n1 2 3 4", output: "-1" }
];

// 97. chainOfDoughnuts
solutions['chainOfDoughnuts'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < m; i++) a.push(parseInt(input[ptr++], 10));
    a.sort((x, y) => x - y);
    let cuts = 0;
    let remM = m;
    for (let i = 0; i < m; i++) {
      if (a[i] <= remM - 2) {
        cuts += a[i];
        remM -= (a[i] + 1);
      } else {
        cuts += (remM - 1);
        break;
      }
    }
    out.push(cuts);
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['chainOfDoughnuts'] = [
  { input: "2\n11 3\n4 3 4\n6 3\n1 2 3", output: "2\n1" }
];

// 98. balanceZeroesAndOnes
solutions['balanceZeroesAndOnes'] = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const s = input[ptr++].split('');
    const n = s.length;
    let c0 = 0, c1 = 0, q = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') c0++;
      else if (s[i] === '1') c1++;
      else q++;
    }
    let need0 = Math.max(0, Math.min(q, (q + c1 - c0 + 1) >> 1));
    for (let i = 0; i < n; i++) {
      if (s[i] === '?') {
        if (need0 > 0) {
          s[i] = '0';
          need0--;
        } else {
          s[i] = '1';
        }
      }
    }
    out.push(s.join(''));
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['balanceZeroesAndOnes'] = [
  { input: "2\n??\n0?1", output: "01\n001" }
];

// 99. weightOfNumbers
solutions['weightOfNumbers'] = `const fs = require('fs');
const MOD = 1000000007n;

function pow(base, exp) {
  let res = 1n;
  base %= MOD;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % MOD;
    base = (base * base) % MOD;
    exp >>= 1n;
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = BigInt(input[ptr++]);
    const w = parseInt(input[ptr++], 10);
    let count = 0n;
    for (let d1 = 1; d1 <= 9; d1++) {
      const dN = d1 + w;
      if (dN >= 0 && dN <= 9) count++;
    }
    if (count === 0n || n < 2n) {
      out.push(0);
    } else {
      const ans = (count * pow(10n, n - 2n)) % MOD;
      out.push(ans.toString());
    }
  }
  console.log(out.join('\\n'));
}
solve();`;

tests['weightOfNumbers'] = [
  { input: "2\n2 1\n3 0", output: "8\n90" }
];

// Write all solutions and tests
let written = 0;
for (const [name, code] of Object.entries(solutions)) {
  fs.writeFileSync(path.join(solDir, `${name}.js`), code, 'utf-8');
  fs.writeFileSync(path.join(rootSolDir, `${name}.js`), code, 'utf-8');
  if (tests[name]) {
    fs.writeFileSync(path.join(testDir, `${name}.json`), JSON.stringify(tests[name], null, 2), 'utf-8');
  }
  written++;
}

console.log('Successfully built ' + written + ' CodeChef solutions and test fixtures.');
