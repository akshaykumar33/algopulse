const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const s = input[ptr++], t = input[ptr++];
    const ca = new Int32Array(26), cb = new Int32Array(26);
    for (let i = 0; i < s.length; i++) {
      ca[s.charCodeAt(i) - 97]++;
      cb[t.charCodeAt(i) - 97]++;
    }
    let aWin = false;
    for (let i = 0; i < 26; i++) {
      if (ca[i] >= 2 && cb[i] === 0) {
        aWin = true;
        break;
      }
    }
    if (!aWin) {
      let hasUniqueA = false;
      for (let i = 0; i < 26; i++) {
        if (ca[i] > 0 && cb[i] === 0) hasUniqueA = true;
      }
      let bHasUnique = false;
      for (let i = 0; i < 26; i++) {
        if (cb[i] > 0 && ca[i] === 0) bHasUnique = true;
      }
      if (hasUniqueA && !bHasUnique) aWin = true;
    }
    out.push(aWin ? 'A' : 'B');
  }
  console.log(out.join('\n'));
}
solve();