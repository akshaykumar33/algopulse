const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextWord() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('latin1', start, pos);
  }

  const tStr = nextWord();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextWord(), 10);
    const s = nextWord();

    const zeros = [];
    const ones = [];
    const ans = new Int32Array(n);
    let k = 0;

    for (let i = 0; i < n; i++) {
      if (s[i] === '0') {
        if (ones.length > 0) {
          const id = ones.pop();
          zeros.push(id);
          ans[i] = id;
        } else {
          k++;
          zeros.push(k);
          ans[i] = k;
        }
      } else {
        if (zeros.length > 0) {
          const id = zeros.pop();
          ones.push(id);
          ans[i] = id;
        } else {
          k++;
          ones.push(k);
          ans[i] = k;
        }
      }
    }

    out.push(k);
    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
