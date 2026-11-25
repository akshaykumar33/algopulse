const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

function solve() {
  if (!tokens[0]) return;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const freq = new Int32Array(26);
  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const n = s.length;
    freq.fill(0);
    const arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      const c = s.charCodeAt(i) - 97;
      arr[i] = c;
      freq[c]++;
    }
    let ans = n;
    for (let c = 0; c < 26; c++) {
      const k = freq[c];
      if (k === 0) continue;
      if (k === 1) {
        ans = 0;
        break;
      }
      let cur = 0;
      for (let i = 0; i < k; i++) if (arr[i] === c) cur++;
      let mx = cur;
      for (let i = k; i < n; i++) {
        if (arr[i] === c) cur++;
        if (arr[i - k] === c) cur--;
        if (cur > mx) mx = cur;
      }
      if (k - mx < ans) ans = k - mx;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
