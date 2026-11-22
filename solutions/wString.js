const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const s = input[ptr++];
    const hashPos = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '#') hashPos.push(i);
    }
    if (hashPos.length < 3) {
      out.push(0);
      continue;
    }
    const hCount = hashPos.length;
    const prefMax = new Int32Array(hCount);
    const suffMax = new Int32Array(hCount);
    const midMax = new Int32Array(hCount);
    for (let i = 0; i < hCount; i++) {
      const p = hashPos[i];
      const freq = new Int32Array(26);
      let m = 0;
      for (let j = 0; j < p; j++) {
        if (s[j] !== '#') {
          const c = s.charCodeAt(j) - 97;
          freq[c]++;
          if (freq[c] > m) m = freq[c];
        }
      }
      prefMax[i] = m;
    }
    for (let i = 0; i < hCount; i++) {
      const p = hashPos[i];
      const freq = new Int32Array(26);
      let m = 0;
      for (let j = p + 1; j < s.length; j++) {
        if (s[j] !== '#') {
          const c = s.charCodeAt(j) - 97;
          freq[c]++;
          if (freq[c] > m) m = freq[c];
        }
      }
      suffMax[i] = m;
    }
    for (let i = 0; i < hCount - 1; i++) {
      const p1 = hashPos[i], p2 = hashPos[i + 1];
      const freq = new Int32Array(26);
      let m = 0;
      for (let j = p1 + 1; j < p2; j++) {
        if (s[j] !== '#') {
          const c = s.charCodeAt(j) - 97;
          freq[c]++;
          if (freq[c] > m) m = freq[c];
        }
      }
      midMax[i] = m;
    }
    let ans = 0;
    for (let i = 0; i + 2 < hCount; i++) {
      const p1 = prefMax[i];
      const m1 = midMax[i];
      const m2 = midMax[i + 1];
      const s1 = suffMax[i + 2];
      if (p1 > 0 && m1 > 0 && m2 > 0 && s1 > 0) {
        const len = p1 + m1 + m2 + s1 + 3;
        if (len > ans) ans = len;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
solve();