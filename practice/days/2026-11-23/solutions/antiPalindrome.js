const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    if (n % 2 !== 0) {
      out.push('NO');
      continue;
    }
    const freq = {};
    for (let i = 0; i < n; i++) {
      freq[s[i]] = (freq[s[i]] || 0) + 1;
    }
    let maxF = 0;
    for (const ch in freq) {
      if (freq[ch] > maxF) maxF = freq[ch];
    }
    if (maxF > n / 2) {
      out.push('NO');
      continue;
    }
    const chars = s.split('').sort();
    const half = n / 2;
    const firstHalf = chars.slice(0, half);
    const secondHalf = chars.slice(half).reverse();
    out.push('YES');
    out.push(firstHalf.join('') + secondHalf.join(''));
  }
  console.log(out.join('\n'));
}

solve();
