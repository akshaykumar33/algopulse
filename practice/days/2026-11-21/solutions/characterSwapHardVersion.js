const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++].split('');
    const s2 = input[ptr++].split('');
    const cnt = new Int32Array(26);
    for (let i = 0; i < n; i++) {
      cnt[s[i].charCodeAt(0) - 97]++;
      cnt[s2[i].charCodeAt(0) - 97]++;
    }
    let ok = true;
    for (let i = 0; i < 26; i++) {
      if (cnt[i] & 1) { ok = false; break; }
    }
    if (!ok) {
      out.push('No');
      continue;
    }
    out.push('Yes');
    const swaps = [];
    for (let i = 0; i < n; i++) {
      if (s[i] === s2[i]) continue;
      let found = false;
      for (let j = i + 1; j < n; j++) {
        if (s[j] === s[i]) {
          const tmp = s[j]; s[j] = s2[i]; s2[i] = tmp;
          swaps.push((j + 1) + ' ' + (i + 1));
          found = true;
          break;
        }
      }
      if (!found) {
        for (let j = i + 1; j < n; j++) {
          if (s2[j] === s[i]) {
            const tmp1 = s[j]; s[j] = s2[j]; s2[j] = tmp1;
            swaps.push((j + 1) + ' ' + (j + 1));
            const tmp2 = s[j]; s[j] = s2[i]; s2[i] = tmp2;
            swaps.push((j + 1) + ' ' + (i + 1));
            break;
          }
        }
      }
    }
    out.push(swaps.length);
    for (const sw of swaps) out.push(sw);
  }
  console.log(out.join('\n'));
}
solve();