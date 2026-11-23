const fs = require('fs');

const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    const p = input[ptr++];
    let minOps = Infinity;
    for (let c = 0; c < 26; c++) {
      const ch = String.fromCharCode(97 + c);
      let curOps = 0;
      for (let i = 0; i < n; i++) {
        const chS = s[i] === '?' ? ch : s[i];
        const chP = p[i] === '?' ? ch : p[i];
        if (chS === chP) continue;
        const vS = vowels.has(chS);
        const vP = vowels.has(chP);
        if (vS !== vP) curOps += 1;
        else curOps += 2;
      }
      if (curOps < minOps) minOps = curOps;
    }
    out.push(minOps);
  }
  console.log(out.join('\n'));
}

solve();
