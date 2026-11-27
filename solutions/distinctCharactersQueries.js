const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const sArr = tokens[ptr++].split('');
  const n = sArr.length;
  const bit = new Int32Array(26 * (n + 1));
  function add(charIdx, i, delta) {
    for (; i <= n; i += i & -i) bit[charIdx * (n + 1) + i] += delta;
  }
  function query(charIdx, i) {
    let sum = 0;
    for (; i > 0; i -= i & -i) sum += bit[charIdx * (n + 1) + i];
    return sum;
  }
  for (let i = 0; i < n; i++) {
    add(sArr[i].charCodeAt(0) - 97, i + 1, 1);
  }
  const q = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let qi = 0; qi < q; qi++) {
    const type = tokens[ptr++];
    if (type === '1') {
      const pos = parseInt(tokens[ptr++], 10);
      const newChar = tokens[ptr++];
      const oldChar = sArr[pos - 1];
      if (oldChar !== newChar) {
        add(oldChar.charCodeAt(0) - 97, pos, -1);
        add(newChar.charCodeAt(0) - 97, pos, 1);
        sArr[pos - 1] = newChar;
      }
    } else {
      const l = parseInt(tokens[ptr++], 10);
      const r = parseInt(tokens[ptr++], 10);
      let count = 0;
      for (let c = 0; c < 26; c++) {
        if (query(c, r) - query(c, l - 1) > 0) count++;
      }
      out.push(count);
    }
  }
  console.log(out.join('\n'));
}
