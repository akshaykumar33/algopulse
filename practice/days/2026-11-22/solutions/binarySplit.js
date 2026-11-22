const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    const blocks = [];
    let i = 0;
    while (i < n) {
      let j = i;
      while (j < n && s[j] === s[i]) j++;
      blocks.push({ char: s[i], len: j - i });
      i = j;
    }
    if (blocks.length <= 2) {
      out.push(s);
      continue;
    }
    let maxZeroLen = 0;
    for (let k = 0; k < blocks.length - 1; k++) {
      if (blocks[k].char === '0') {
        if (blocks[k].len > maxZeroLen) maxZeroLen = blocks[k].len;
      }
    }
    let minOneLen = Infinity;
    for (let k = 0; k < blocks.length - 1; k++) {
      if (blocks[k].char === '0' && blocks[k].len === maxZeroLen) {
        if (blocks[k + 1].len < minOneLen) minOneLen = blocks[k + 1].len;
      }
    }
    out.push('0'.repeat(maxZeroLen) + '1'.repeat(minOneLen));
  }
  console.log(out.join('\n'));
}
solve();