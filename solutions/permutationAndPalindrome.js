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
    const s = nextWord();
    const n = s.length;
    const indices = Array.from({ length: 26 }, () => []);

    for (let i = 0; i < n; i++) {
      indices[s.charCodeAt(i) - 97].push(i + 1);
    }

    let oddChar = -1;
    let impossible = false;

    for (let c = 0; c < 26; c++) {
      if (indices[c].length % 2 === 1) {
        if (oddChar !== -1) {
          impossible = true;
          break;
        }
        oddChar = c;
      }
    }

    if (impossible) {
      out.push(-1);
      continue;
    }

    let mid = null;
    if (oddChar !== -1) {
      mid = indices[oddChar].pop();
    }

    const left = [];
    const right = [];

    for (let c = 0; c < 26; c++) {
      const list = indices[c];
      for (let i = 0; i < list.length; i += 2) {
        left.push(list[i]);
        right.push(list[i + 1]);
      }
    }

    right.reverse();
    const ans = mid !== null ? [...left, mid, ...right] : [...left, ...right];
    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
