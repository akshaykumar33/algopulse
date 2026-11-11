const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const s = tokens[ptr++];
  const n = parseInt(tokens[ptr++], 10);
  const freq = new Int32Array(26);
  let distinct = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i) - 97;
    if (freq[c] === 0) distinct++;
    freq[c]++;
  }
  if (distinct > n) {
    console.log(-1);
    return;
  }
  let lo = 1;
  let hi = s.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    let need = 0;
    for (let c = 0; c < 26; c++) {
      if (freq[c] > 0) need += ((freq[c] + mid - 1) / mid) | 0;
    }
    if (need <= n) hi = mid;
    else lo = mid + 1;
  }
  const res = [];
  for (let c = 0; c < 26; c++) {
    if (freq[c] > 0) {
      const cnt = ((freq[c] + lo - 1) / lo) | 0;
      const ch = String.fromCharCode(97 + c);
      for (let j = 0; j < cnt; j++) res.push(ch);
    }
  }
  while (res.length < n) res.push('a');
  console.log(lo + '\n' + res.join(''));
}

solve();
