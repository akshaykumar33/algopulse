const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    if (n % 2 !== 0) {
      out.push(-1);
      continue;
    }
    const freq = new Int32Array(26);
    let maxFreq = 0;
    for (let i = 0; i < n; i++) {
      const c = s.charCodeAt(i) - 97;
      freq[c]++;
      if (freq[c] > maxFreq) maxFreq = freq[c];
    }
    if (maxFreq > n / 2) {
      out.push(-1);
      continue;
    }
    const matchFreq = new Int32Array(26);
    let totalMatches = 0;
    let maxMatch = 0;
    for (let i = 0; i < n / 2; i++) {
      if (s[i] === s[n - 1 - i]) {
        const c = s.charCodeAt(i) - 97;
        matchFreq[c]++;
        totalMatches++;
        if (matchFreq[c] > maxMatch) maxMatch = matchFreq[c];
      }
    }
    const ans = Math.max(Math.ceil(totalMatches / 2), maxMatch);
    out.push(ans);
  }
  console.log(out.join('\n'));
}
