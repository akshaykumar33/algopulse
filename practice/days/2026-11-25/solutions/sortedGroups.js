const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

function solve() {
  if (!tokens[0]) return;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const cnt = new Int32Array(26);
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    cnt.fill(0);
    const isA = new Uint8Array(n);
    let last = 0;
    for (let i = 0; i < n; i++) {
      const c = s.charCodeAt(i) - 97;
      if (c >= last) {
        last = c;
        isA[i] = 1;
      } else {
        cnt[c]++;
      }
    }
    const res = new Array(n);
    let cp = 0;
    for (let i = 0; i < n; i++) {
      if (isA[i]) {
        res[i] = s[i];
      } else {
        while (cnt[cp] === 0) cp++;
        cnt[cp]--;
        res[i] = String.fromCharCode(97 + cp);
      }
    }
    out.push(res.join(''));
  }
  console.log(out.join('\n'));
}

solve();
