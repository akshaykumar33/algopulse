const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const s = nextToken();
    const cnt = new Int32Array(26);
    let maxFreq = 0;
    for (let i = 0; i < n; i++) {
      const code = s.charCodeAt(i) - 97;
      cnt[code]++;
      if (cnt[code] > maxFreq) maxFreq = cnt[code];
    }
    const half = Math.floor(n / 2);
    if (maxFreq > half) {
      out.push(2 * maxFreq - n);
    } else {
      out.push(n % 2);
    }
  }

  console.log(out.join('\n'));
}

solve();
