const MOD = 1000000007n;
const fact = [1n];
for (let i = 1; i <= 500; i++) {
  fact.push((fact[i - 1] * BigInt(i)) % MOD);
}

function modInverse(a, m) {
  let m0 = m;
  let y = 0n, x = 1n;
  if (m === 1n) return 0n;
  while (a > 1n) {
    let q = a / m;
    let t = m;
    m = a % m;
    a = t;
    t = y;
    y = x - q * y;
    x = t;
  }
  if (x < 0n) x += m0;
  return x;
}

class Solution {
  countSmeagoleseAnagrams(s) {
    const n = s.length;
    const freq = {};
    for (let i = 0; i < n; i++) {
      freq[s[i]] = (freq[s[i]] || 0) + 1;
    }
    let num = fact[n];
    let den = 1n;
    for (const ch in freq) {
      den = (den * fact[freq[ch]]) % MOD;
    }
    return Number((num * modInverse(den, MOD)) % MOD);
  }
}

// ---------------- LOCAL TEST HARNESS ----------------
const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const sol = new Solution();
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    out.push(sol.countSmeagoleseAnagrams(input[ptr++]));
  }
  console.log(out.join('\n'));
}
solve();
