const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const s = [input[ptr++].split(''), input[ptr++].split('')];
    const t = parseInt(input[ptr++], 10);
    const q = parseInt(input[ptr++], 10);
    const n = s[0].length;
    let diff = 0;
    for (let i = 0; i < n; i++) {
      if (s[0][i] !== s[1][i]) diff++;
    }
    const unblockAt = new Map();
    for (let time = 1; time <= q; time++) {
      if (unblockAt.has(time)) {
        const pos = unblockAt.get(time);
        if (s[0][pos] !== s[1][pos]) diff++;
      }
      const type = parseInt(input[ptr++], 10);
      if (type === 1) {
        const pos = parseInt(input[ptr++], 10) - 1;
        if (s[0][pos] !== s[1][pos]) diff--;
        unblockAt.set(time + t, pos);
      } else if (type === 2) {
        const str1 = parseInt(input[ptr++], 10) - 1;
        const pos1 = parseInt(input[ptr++], 10) - 1;
        const str2 = parseInt(input[ptr++], 10) - 1;
        const pos2 = parseInt(input[ptr++], 10) - 1;
        const d1Before = s[0][pos1] !== s[1][pos1] ? 1 : 0;
        const d2Before = (pos1 !== pos2 && s[0][pos2] !== s[1][pos2]) ? 1 : 0;
        const tmp = s[str1][pos1];
        s[str1][pos1] = s[str2][pos2];
        s[str2][pos2] = tmp;
        const d1After = s[0][pos1] !== s[1][pos1] ? 1 : 0;
        const d2After = (pos1 !== pos2 && s[0][pos2] !== s[1][pos2]) ? 1 : 0;
        diff += (d1After - d1Before) + (d2After - d2Before);
      } else if (type === 3) {
        out.push(diff === 0 ? 'YES' : 'NO');
      }
    }
  }
  console.log(out.join('\n'));
}
solve();