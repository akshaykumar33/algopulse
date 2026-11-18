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

  const nStr = nextWord();
  if (!nStr) return;
  const n = parseInt(nStr, 10);
  const k = parseInt(nextWord(), 10);
  const s = nextWord();

  function maxLen(targetChar) {
    let left = 0;
    let diff = 0;
    let max = 0;
    for (let right = 0; right < n; right++) {
      if (s[right] !== targetChar) diff++;
      while (diff > k) {
        if (s[left] !== targetChar) diff--;
        left++;
      }
      const len = right - left + 1;
      if (len > max) max = len;
    }
    return max;
  }

  const ans = Math.max(maxLen('a'), maxLen('b'));
  console.log(ans);
}

solve();
