const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextWord() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const tStr = nextWord();
  if (!tStr) return;
  const t = parseInt(tStr, 10);

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = nextWord();
    if (!s) break;

    const n = s.length;
    let c1 = 0;
    let c2 = 0;
    let c3 = 0;
    let minLen = Infinity;
    let l = 0;

    for (let r = 0; r < n; r++) {
      const ch = s.charCodeAt(r);
      if (ch === 49) c1++;
      else if (ch === 50) c2++;
      else if (ch === 51) c3++;

      while (c1 > 0 && c2 > 0 && c3 > 0) {
        const len = r - l + 1;
        if (len < minLen) minLen = len;
        const leftCh = s.charCodeAt(l);
        if (leftCh === 49) c1--;
        else if (leftCh === 50) c2--;
        else if (leftCh === 51) c3--;
        l++;
      }
    }

    out.push(minLen === Infinity ? 0 : minLen);
  }

  console.log(out.join('\n'));
}

solve();
